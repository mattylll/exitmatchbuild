import { MatchRecommendation, MatchCacheConfig } from '@/types/matching'

/**
 * In-memory cache for match results
 * In production, consider using Redis for distributed caching
 */
class MatchCache {
  private cache: Map<string, { data: any; expires: number }> = new Map()
  private defaultTTL = 900 // 15 minutes default

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const cached = this.cache.get(key)
    
    if (!cached) {
      return null
    }
    
    if (Date.now() > cached.expires) {
      this.cache.delete(key)
      return null
    }
    
    return cached.data as T
  }

  /**
   * Set cached data
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const expires = Date.now() + (ttl || this.defaultTTL) * 1000
    this.cache.set(key, { data, expires })
  }

  /**
   * Delete cached data
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache or by pattern
   */
  clear(pattern?: string): void {
    if (!pattern) {
      this.cache.clear()
      return
    }
    
    const keys = Array.from(this.cache.keys())
    keys.forEach(key => {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    })
  }

  /**
   * Invalidate cache entries by event
   */
  invalidateByEvent(event: string): void {
    const invalidationMap: Record<string, string[]> = {
      'buyer_preference_update': ['recommendations:', 'matches:'],
      'business_update': ['business:', 'matches:'],
      'new_business_listed': ['recommendations:'],
      'business_removed': ['recommendations:', 'matches:'],
    }
    
    const patterns = invalidationMap[event] || []
    patterns.forEach(pattern => this.clear(pattern))
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number
    keys: string[]
    memoryUsage: number
  } {
    const keys = Array.from(this.cache.keys())
    const memoryUsage = this.estimateMemoryUsage()
    
    return {
      size: this.cache.size,
      keys,
      memoryUsage,
    }
  }

  /**
   * Estimate memory usage (simplified)
   */
  private estimateMemoryUsage(): number {
    let bytes = 0
    this.cache.forEach((value, key) => {
      bytes += key.length * 2 // Rough estimate for string
      bytes += JSON.stringify(value.data).length * 2
    })
    return bytes
  }
}

// Singleton instance
export const matchCache = new MatchCache()

/**
 * Cache key generators
 */
export const cacheKeys = {
  recommendations: (buyerId: string, page = 1, limit = 10) => 
    `recommendations:${buyerId}:${page}:${limit}`,
  
  match: (buyerId: string, businessId: string) => 
    `match:${buyerId}:${businessId}`,
  
  businessMatches: (businessId: string) => 
    `business:${businessId}:matches`,
  
  buyerMatches: (buyerId: string) => 
    `buyer:${buyerId}:matches`,
  
  preferences: (buyerId: string) => 
    `preferences:${buyerId}`,
}

/**
 * Cache decorator for async functions
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  ttl?: number
): T {
  return (async (...args: Parameters<T>) => {
    const key = keyGenerator(...args)
    
    // Check cache
    const cached = matchCache.get(key)
    if (cached !== null) {
      return cached
    }
    
    // Execute function
    const result = await fn(...args)
    
    // Store in cache
    matchCache.set(key, result, ttl)
    
    return result
  }) as T
}

/**
 * Batch cache operations
 */
export class BatchCache {
  private operations: Array<{
    type: 'get' | 'set' | 'delete'
    key: string
    data?: any
    ttl?: number
  }> = []

  get(key: string): this {
    this.operations.push({ type: 'get', key })
    return this
  }

  set(key: string, data: any, ttl?: number): this {
    this.operations.push({ type: 'set', key, data, ttl })
    return this
  }

  delete(key: string): this {
    this.operations.push({ type: 'delete', key })
    return this
  }

  async execute(): Promise<Map<string, any>> {
    const results = new Map<string, any>()
    
    for (const op of this.operations) {
      switch (op.type) {
        case 'get':
          results.set(op.key, matchCache.get(op.key))
          break
        case 'set':
          matchCache.set(op.key, op.data, op.ttl)
          results.set(op.key, true)
          break
        case 'delete':
          results.set(op.key, matchCache.delete(op.key))
          break
      }
    }
    
    this.operations = []
    return results
  }
}

/**
 * Cache warming utility
 */
export async function warmCache(
  buyerIds: string[],
  fetchRecommendations: (buyerId: string) => Promise<MatchRecommendation[]>
): Promise<void> {
  const promises = buyerIds.map(async (buyerId) => {
    const key = cacheKeys.recommendations(buyerId)
    const data = await fetchRecommendations(buyerId)
    matchCache.set(key, data, 1800) // 30 minutes for warmed cache
  })
  
  await Promise.all(promises)
}

/**
 * Cache middleware for API routes
 */
export function cacheMiddleware(config?: Partial<MatchCacheConfig>) {
  return async (
    req: Request,
    handler: (req: Request) => Promise<Response>
  ): Promise<Response> => {
    const url = new URL(req.url)
    const cacheKey = config?.key || url.pathname + url.search
    const ttl = config?.ttl || 300
    
    // Check if this is a cache invalidation request
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      // Invalidate related cache entries
      if (config?.invalidateOn) {
        config.invalidateOn.forEach(pattern => matchCache.clear(pattern))
      }
      return handler(req)
    }
    
    // Try to get from cache for GET requests
    if (req.method === 'GET') {
      const cached = matchCache.get<Response>(cacheKey)
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'HIT',
          },
        })
      }
    }
    
    // Execute handler and cache result
    const response = await handler(req)
    
    if (response.ok && req.method === 'GET') {
      const data = await response.json()
      matchCache.set(cacheKey, data, ttl)
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'MISS',
        },
      })
    }
    
    return response
  }
}