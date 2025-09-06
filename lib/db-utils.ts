/**
 * Database Utilities for ExitMatch
 * 
 * Common database operations, query helpers, and transaction utilities
 */

import { Prisma, PrismaClient } from '@prisma/client';
import { cache } from 'react';

// Re-export prisma client from existing file
export { prisma } from './prisma';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface SoftDeleteOptions {
  cascade?: boolean;
  force?: boolean;
}

// ============================================================================
// PAGINATION HELPERS
// ============================================================================

/**
 * Create pagination options for Prisma queries
 */
export function getPaginationOptions(params: PaginationParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    ...(params.sortBy && {
      orderBy: {
        [params.sortBy]: params.sortOrder || 'desc'
      }
    })
  };
}

/**
 * Create paginated response with metadata
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResult<T> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    }
  };
}

// ============================================================================
// SOFT DELETE IMPLEMENTATION
// ============================================================================

/**
 * Soft delete a record by setting deletedAt timestamp
 */
export async function softDelete<T extends { id: string; deletedAt: Date | null }>(
  prisma: PrismaClient,
  model: Prisma.ModelName,
  id: string,
  options?: SoftDeleteOptions
): Promise<T> {
  const modelDelegate = (prisma as any)[model.toLowerCase()];
  
  if (options?.force) {
    // Perform hard delete
    return await modelDelegate.delete({
      where: { id }
    });
  }

  // Perform soft delete
  const result = await modelDelegate.update({
    where: { id },
    data: { deletedAt: new Date() }
  });

  // Handle cascade soft deletes if needed
  if (options?.cascade) {
    await handleCascadeSoftDelete(prisma, model, id);
  }

  return result;
}

/**
 * Restore a soft-deleted record
 */
export async function softRestore<T extends { id: string; deletedAt: Date | null }>(
  prisma: PrismaClient,
  model: Prisma.ModelName,
  id: string
): Promise<T> {
  const modelDelegate = (prisma as any)[model.toLowerCase()];
  
  return await modelDelegate.update({
    where: { id },
    data: { deletedAt: null }
  });
}

/**
 * Handle cascade soft deletes for related records
 */
async function handleCascadeSoftDelete(
  prisma: PrismaClient,
  model: Prisma.ModelName,
  id: string
): Promise<void> {
  // Handle specific cascade rules based on model
  switch (model) {
    case 'Business':
      // Soft delete related documents, images, inquiries, etc.
      await prisma.$transaction([
        prisma.document.updateMany({
          where: { businessId: id, deletedAt: null },
          data: { deletedAt: new Date() }
        }),
        prisma.businessImage.updateMany({
          where: { businessId: id },
          data: { deletedAt: new Date() } as any
        }),
        // Add more cascade deletes as needed
      ]);
      break;
    
    case 'User':
      // Soft delete user's businesses and related data
      await prisma.$transaction([
        prisma.business.updateMany({
          where: { sellerId: id, deletedAt: null },
          data: { deletedAt: new Date() }
        }),
        // Add more cascade deletes as needed
      ]);
      break;
    
    // Add more models as needed
  }
}

// ============================================================================
// QUERY BUILDERS
// ============================================================================

/**
 * Build where clause excluding soft-deleted records
 */
export function excludeSoftDeleted<T extends Record<string, any>>(
  where?: T
): T & { deletedAt: null } {
  return {
    ...where,
    deletedAt: null
  } as T & { deletedAt: null };
}

/**
 * Build search conditions for text fields
 */
export function buildSearchConditions(
  searchTerm: string,
  fields: string[]
): Prisma.Sql {
  const conditions = fields.map(field => 
    Prisma.sql`${Prisma.raw(field)} ILIKE ${`%${searchTerm}%`}`
  );
  
  return Prisma.sql`(${Prisma.join(conditions, ' OR ')})`;
}

// ============================================================================
// TRANSACTION HELPERS
// ============================================================================

/**
 * Execute operations in a transaction with retry logic
 */
export async function withTransaction<T>(
  prisma: PrismaClient,
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      return await prisma.$transaction(fn, {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      });
    } catch (error: any) {
      attempts++;
      
      // Check if error is retryable
      if (
        attempts < maxRetries &&
        (error.code === 'P2034' || // Transaction failed
         error.code === 'P2024')   // Timed out
      ) {
        // Wait before retry with exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempts) * 100)
        );
        continue;
      }
      
      throw error;
    }
  }
  
  throw new Error('Transaction failed after maximum retries');
}

// ============================================================================
// DATA VALIDATION HELPERS
// ============================================================================

/**
 * Validate UK company number format
 */
export function validateCompanyNumber(companyNumber: string): boolean {
  // UK company numbers are 8 digits, sometimes with leading zeros
  const pattern = /^[0-9]{8}$|^[A-Z]{2}[0-9]{6}$/;
  return pattern.test(companyNumber);
}

/**
 * Validate UK VAT number format
 */
export function validateVATNumber(vatNumber: string): boolean {
  // UK VAT number format: GB followed by 9 or 12 digits
  const pattern = /^GB[0-9]{9}$|^GB[0-9]{12}$/;
  return pattern.test(vatNumber.replace(/\s/g, ''));
}

/**
 * Validate UK phone number
 */
export function validateUKPhoneNumber(phone: string): boolean {
  // Remove spaces and non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // UK phone numbers are 10 or 11 digits
  if (cleaned.length === 10) {
    return /^0[1-9][0-9]{8}$/.test(cleaned);
  } else if (cleaned.length === 11) {
    return /^0[1-9][0-9]{9}$/.test(cleaned);
  } else if (cleaned.length === 13 && cleaned.startsWith('44')) {
    return true; // International format
  }
  
  return false;
}

/**
 * Validate and sanitize monetary values
 */
export function sanitizeMonetaryValue(value: any): number {
  if (typeof value === 'string') {
    // Remove currency symbols, commas, and spaces
    value = value.replace(/[£$€,\s]/g, '');
  }
  
  const parsed = parseFloat(value);
  
  if (isNaN(parsed) || parsed < 0) {
    throw new Error('Invalid monetary value');
  }
  
  // Round to 2 decimal places
  return Math.round(parsed * 100) / 100;
}

// ============================================================================
// CACHE HELPERS (for Next.js App Router)
// ============================================================================

/**
 * Cached database query wrapper
 */
export const getCachedData = cache(async <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  return await fetcher();
});

// ============================================================================
// AUDIT & LOGGING
// ============================================================================

/**
 * Create audit log entry
 */
export async function createAuditLog(
  prisma: PrismaClient,
  params: {
    userId?: string;
    action: string;
    entityType: string;
    entityId: string;
    oldValues?: any;
    newValues?: any;
    metadata?: any;
    ipAddress?: string;
    userAgent?: string;
  }
): Promise<void> {
  await prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      oldValues: params.oldValues,
      newValues: params.newValues,
      changes: params.oldValues && params.newValues
        ? calculateChanges(params.oldValues, params.newValues)
        : null,
      metadata: params.metadata,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent
    }
  });
}

/**
 * Create activity log entry
 */
export async function createActivityLog(
  prisma: PrismaClient,
  params: {
    userId: string;
    activityType: string;
    description: string;
    entityType?: string;
    entityId?: string;
    metadata?: any;
    ipAddress?: string;
    userAgent?: string;
  }
): Promise<void> {
  await prisma.activityLog.create({
    data: params
  });
}

/**
 * Calculate changes between old and new values
 */
function calculateChanges(oldValues: any, newValues: any): any {
  const changes: any = {};
  
  for (const key in newValues) {
    if (oldValues[key] !== newValues[key]) {
      changes[key] = {
        from: oldValues[key],
        to: newValues[key]
      };
    }
  }
  
  return changes;
}

// ============================================================================
// BUSINESS LOGIC HELPERS
// ============================================================================

/**
 * Calculate business valuation range based on financial data
 */
export function calculateValuationRange(params: {
  revenue: number;
  profit: number;
  ebitda: number;
  industry: string;
  assets?: number;
}): { min: number; max: number; estimated: number } {
  // Industry multiples (simplified - should be fetched from a data source)
  const industryMultiples: Record<string, number> = {
    'Technology': 4.5,
    'Healthcare': 3.8,
    'Manufacturing': 2.5,
    'Retail': 2.0,
    'Professional Services': 3.0,
    'default': 2.5
  };
  
  const multiple = industryMultiples[params.industry] || industryMultiples.default;
  
  // Calculate different valuation methods
  const revenueBasedValue = params.revenue * (multiple * 0.5);
  const profitBasedValue = params.profit * multiple * 3;
  const ebitdaBasedValue = params.ebitda * multiple;
  const assetBasedValue = params.assets ? params.assets * 1.2 : 0;
  
  // Weight the different methods
  const weights = {
    revenue: 0.15,
    profit: 0.25,
    ebitda: 0.45,
    assets: 0.15
  };
  
  const estimatedValue = 
    revenueBasedValue * weights.revenue +
    profitBasedValue * weights.profit +
    ebitdaBasedValue * weights.ebitda +
    assetBasedValue * weights.assets;
  
  return {
    min: Math.round(estimatedValue * 0.8),
    max: Math.round(estimatedValue * 1.2),
    estimated: Math.round(estimatedValue)
  };
}

/**
 * Calculate match score between buyer and business
 */
export function calculateMatchScore(params: {
  buyerProfile: {
    minBudget?: number | null;
    maxBudget?: number | null;
    industries: string[];
    preferredLocations: string[];
    minRevenue?: number | null;
    maxRevenue?: number | null;
  };
  business: {
    askingPrice?: number | null;
    industry: string;
    location: string;
    annualRevenue?: number | null;
  };
}): number {
  let score = 0;
  let factors = 0;
  
  // Budget match (30 points)
  if (params.buyerProfile.minBudget && params.buyerProfile.maxBudget && params.business.askingPrice) {
    const price = Number(params.business.askingPrice);
    const minBudget = Number(params.buyerProfile.minBudget);
    const maxBudget = Number(params.buyerProfile.maxBudget);
    
    if (price >= minBudget && price <= maxBudget) {
      score += 30;
    } else if (price < minBudget && price >= minBudget * 0.8) {
      score += 20;
    } else if (price > maxBudget && price <= maxBudget * 1.2) {
      score += 15;
    }
    factors++;
  }
  
  // Industry match (30 points)
  if (params.buyerProfile.industries.includes(params.business.industry)) {
    score += 30;
  }
  factors++;
  
  // Location match (20 points)
  if (params.buyerProfile.preferredLocations.includes(params.business.location)) {
    score += 20;
  } else if (params.buyerProfile.preferredLocations.length === 0) {
    score += 10; // No preference means partial match
  }
  factors++;
  
  // Revenue match (20 points)
  if (params.buyerProfile.minRevenue && params.buyerProfile.maxRevenue && params.business.annualRevenue) {
    const revenue = Number(params.business.annualRevenue);
    const minRevenue = Number(params.buyerProfile.minRevenue);
    const maxRevenue = Number(params.buyerProfile.maxRevenue);
    
    if (revenue >= minRevenue && revenue <= maxRevenue) {
      score += 20;
    } else if (revenue < minRevenue && revenue >= minRevenue * 0.8) {
      score += 10;
    } else if (revenue > maxRevenue && revenue <= maxRevenue * 1.2) {
      score += 10;
    }
    factors++;
  }
  
  // Normalize score to 0-100
  const maxPossibleScore = factors > 0 ? 100 : 0;
  return Math.min(100, Math.round(score));
}

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

/**
 * Calculate business performance metrics
 */
export function calculateBusinessMetrics(params: {
  viewCount: number;
  uniqueViewCount: number;
  inquiryCount: number;
  favoriteCount: number;
  createdAt: Date;
}): {
  conversionRate: number;
  engagementRate: number;
  averageViewsPerDay: number;
  inquiryToViewRatio: number;
} {
  const daysSinceListing = Math.max(1, 
    Math.floor((Date.now() - params.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );
  
  return {
    conversionRate: params.uniqueViewCount > 0 
      ? (params.inquiryCount / params.uniqueViewCount) * 100 
      : 0,
    engagementRate: params.uniqueViewCount > 0
      ? ((params.inquiryCount + params.favoriteCount) / params.uniqueViewCount) * 100
      : 0,
    averageViewsPerDay: params.viewCount / daysSinceListing,
    inquiryToViewRatio: params.viewCount > 0
      ? params.inquiryCount / params.viewCount
      : 0
  };
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

export const dbUtils = {
  // Pagination
  getPaginationOptions,
  createPaginatedResponse,
  
  // Soft delete
  softDelete,
  softRestore,
  excludeSoftDeleted,
  
  // Transactions
  withTransaction,
  
  // Validation
  validateCompanyNumber,
  validateVATNumber,
  validateUKPhoneNumber,
  sanitizeMonetaryValue,
  
  // Audit
  createAuditLog,
  createActivityLog,
  
  // Business logic
  calculateValuationRange,
  calculateMatchScore,
  calculateBusinessMetrics,
  
  // Search
  buildSearchConditions,
};