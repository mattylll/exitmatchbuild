/**
 * Database Seed Script for ExitMatch
 * 
 * This script populates the database with realistic test data for development
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Helper function to generate random date within range
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to generate random number within range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random decimal
function randomDecimal(min: number, max: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

// Helper function to pick random items from array
function pickRandom<T>(array: T[], count: number = 1): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Industry data for UK businesses
const industries = [
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Professional Services',
  'Construction',
  'Transportation',
  'Education',
  'Financial Services',
  'Real Estate',
  'Agriculture',
  'Media & Entertainment',
  'Energy',
  'Food & Beverage'
];

const ukLocations = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Glasgow',
  'Edinburgh',
  'Bristol',
  'Liverpool',
  'Newcastle',
  'Sheffield',
  'Cardiff',
  'Belfast',
  'Nottingham',
  'Leicester',
  'Oxford',
  'Cambridge',
  'Brighton',
  'Southampton',
  'Reading',
  'York'
];

const businessNames = [
  'TechVentures UK',
  'Green Energy Solutions',
  'Digital Marketing Pro',
  'Healthcare Innovations',
  'Manufacturing Excellence',
  'Retail Success Ltd',
  'Professional Consulting Group',
  'Construction Masters',
  'Transport Solutions UK',
  'Education First Academy',
  'FinTech Pioneers',
  'Real Estate Partners',
  'AgriTech Innovations',
  'Media Productions UK',
  'Sustainable Energy Co'
];

async function seed() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in correct order to respect foreign key constraints)
  console.log('🗑️  Clearing existing data...');
  await prisma.searchLog.deleteMany();
  await prisma.pageView.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.review.deleteMany();
  await prisma.nDASignature.deleteMany();
  await prisma.favoriteListing.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.directMessage.deleteMany();
  await prisma.message.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.businessImage.deleteMany();
  await prisma.documentAccess.deleteMany();
  await prisma.dealRoomMilestone.deleteMany();
  await prisma.dealRoomTask.deleteMany();
  await prisma.dealRoomActivity.deleteMany();
  await prisma.dealRoomDocument.deleteMany();
  await prisma.dealRoomAccess.deleteMany();
  await prisma.dealRoom.deleteMany();
  await prisma.match.deleteMany();
  await prisma.valuationHistory.deleteMany();
  await prisma.valuationRequest.deleteMany();
  await prisma.valuation.deleteMany();
  await prisma.businessKeyword.deleteMany();
  await prisma.businessMetric.deleteMany();
  await prisma.financialData.deleteMany();
  await prisma.document.deleteMany();
  await prisma.business.deleteMany();
  await prisma.advisorProfile.deleteMany();
  await prisma.buyerProfile.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log('👥 Creating users...');

  const hashedPassword = await hash('password123', 12);

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@exitmatch.co.uk',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
      lastLoginAt: new Date(),
    }
  });

  // Seller users
  const sellers = await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      const user = await prisma.user.create({
        data: {
          email: `seller${i + 1}@example.com`,
          name: `Seller ${i + 1}`,
          role: 'SELLER',
          emailVerified: new Date(),
          lastLoginAt: randomDate(new Date(2024, 0, 1), new Date()),
          sellerProfile: {
            create: {
              companyName: businessNames[i],
              companyNumber: `${12345678 + i}`,
              position: ['CEO', 'Founder', 'Managing Director', 'Owner', 'Chairman'][i],
              yearsInBusiness: randomInt(5, 25),
              exitTimeframe: ['3-6 months', '6-12 months', '1 year', '1-2 years', 'Flexible'][i],
              sellingReason: 'Looking to retire and pursue other interests',
              involvementPostSale: ['Complete exit', 'Advisory role', 'Transition period', 'Flexible', 'None'][i],
              verified: i < 3, // First 3 sellers are verified
              verifiedAt: i < 3 ? new Date() : null,
              rating: i < 3 ? randomDecimal(3.5, 5, 1) : null,
              totalDeals: randomInt(0, 5),
              successfulDeals: randomInt(0, 3),
              preferredContactMethod: 'email',
              timezone: 'Europe/London'
            }
          }
        }
      });
      return user;
    })
  );

  // Buyer users
  const buyers = await Promise.all(
    Array.from({ length: 8 }, async (_, i) => {
      const user = await prisma.user.create({
        data: {
          email: `buyer${i + 1}@example.com`,
          name: `Buyer ${i + 1}`,
          role: 'BUYER',
          emailVerified: new Date(),
          lastLoginAt: randomDate(new Date(2024, 0, 1), new Date()),
          buyerProfile: {
            create: {
              buyerType: pickRandom(['INDIVIDUAL', 'STRATEGIC_BUYER', 'FINANCIAL_BUYER', 'PRIVATE_EQUITY', 'COMPETITOR'])[0] as any,
              investmentEntity: i > 3 ? `Investment Fund ${i}` : null,
              industries: pickRandom(industries, randomInt(2, 4)),
              minBudget: randomInt(100, 500) * 1000,
              maxBudget: randomInt(1000, 10000) * 1000,
              preferredLocations: pickRandom(ukLocations, randomInt(2, 5)),
              minRevenue: randomInt(100, 500) * 1000,
              maxRevenue: randomInt(1000, 5000) * 1000,
              minEbitda: randomInt(50, 200) * 1000,
              maxEbitda: randomInt(500, 2000) * 1000,
              timeframe: ['Immediate', '3 months', '6 months', '1 year'][i % 4],
              acquisitionExperience: i > 2 ? 'Previously acquired 2-3 businesses' : 'First-time buyer',
              financingType: pickRandom(['CASH', 'BANK_LOAN', 'INVESTOR_BACKED', 'COMBINATION'])[0] as any,
              financingApproved: i < 4,
              businessPlan: 'Looking to expand into new markets and achieve synergies',
              verified: i < 4,
              verifiedAt: i < 4 ? new Date() : null,
              kycCompleted: i < 4,
              kycCompletedAt: i < 4 ? new Date() : null,
              amlChecked: i < 4,
              amlCheckedAt: i < 4 ? new Date() : null,
              rating: i < 4 ? randomDecimal(3.5, 5, 1) : null,
              totalInquiries: randomInt(5, 20),
              totalOffers: randomInt(1, 5),
              successfulDeals: randomInt(0, 2)
            }
          }
        }
      });
      return user;
    })
  );

  // Advisor users
  const advisors = await Promise.all(
    Array.from({ length: 3 }, async (_, i) => {
      const user = await prisma.user.create({
        data: {
          email: `advisor${i + 1}@example.com`,
          name: `Advisor ${i + 1}`,
          role: 'ADVISOR',
          emailVerified: new Date(),
          lastLoginAt: randomDate(new Date(2024, 0, 1), new Date()),
          advisorProfile: {
            create: {
              firmName: `M&A Advisory Partners ${i + 1}`,
              firmWebsite: `https://advisors${i + 1}.com`,
              licenseNumber: `FCA${100000 + i}`,
              specializations: pickRandom(['M&A', 'Valuation', 'Due Diligence', 'Legal', 'Tax', 'Integration'], 3),
              industries: pickRandom(industries, 4),
              qualifications: ['MBA', 'CFA', 'ACA', 'ACCA'][i] ? [['MBA', 'CFA', 'ACA', 'ACCA'][i]] : [],
              yearsExperience: randomInt(10, 25),
              dealsCompleted: randomInt(20, 100),
              typicalDealSize: ['£500K-£2M', '£1M-£5M', '£2M-£10M'][i],
              hourlyRate: randomInt(200, 500),
              successFee: randomDecimal(1, 3, 1),
              bio: `Experienced M&A advisor with ${randomInt(10, 25)} years in the industry. Specializing in mid-market transactions.`,
              linkedinUrl: `https://linkedin.com/in/advisor${i + 1}`,
              verified: true,
              verifiedAt: new Date(),
              insuranceCoverage: randomInt(1, 5) * 1000000,
              insuranceExpiry: new Date(2025, 11, 31),
              regulatoryBody: 'FCA',
              rating: randomDecimal(4, 5, 1),
              totalClients: randomInt(50, 200),
              activeClients: randomInt(5, 15)
            }
          }
        }
      });
      return user;
    })
  );

  // Create Businesses
  console.log('🏢 Creating businesses...');

  const businesses = await Promise.all(
    sellers.map(async (seller, i) => {
      const askingPrice = randomInt(500, 5000) * 1000;
      const annualRevenue = randomInt(askingPrice * 0.5, askingPrice * 2);
      const annualProfit = randomInt(annualRevenue * 0.1, annualRevenue * 0.3);
      const ebitda = randomInt(annualProfit * 0.8, annualProfit * 1.2);
      
      const business = await prisma.business.create({
        data: {
          sellerId: seller.id,
          referenceCode: `BUS${2024}${String(i + 1).padStart(4, '0')}`,
          title: businessNames[i],
          description: `Well-established ${industries[i % industries.length]} business with strong market position and growth potential. ${randomInt(10, 30)} years of successful operation with loyal customer base.`,
          executiveSummary: `This ${industries[i % industries.length]} business has been operating successfully for ${randomInt(10, 30)} years. With annual revenue of £${(annualRevenue / 1000000).toFixed(1)}M and EBITDA of £${(ebitda / 1000000).toFixed(1)}M, it presents an excellent opportunity for growth.`,
          confidentialName: `Established ${industries[i % industries.length]} Business`,
          slug: businessNames[i].toLowerCase().replace(/\s+/g, '-') + '-' + (i + 1),
          askingPrice,
          minimumPrice: askingPrice * 0.85,
          annualRevenue,
          annualProfit,
          ebitda,
          grossMargin: randomDecimal(20, 60, 1),
          netMargin: randomDecimal(5, 25, 1),
          cashFlow: annualProfit * randomDecimal(0.8, 1.2, 2),
          inventory: randomInt(50, 500) * 1000,
          accounts: randomInt(100, 1000) * 1000,
          debt: randomInt(0, askingPrice * 0.3),
          industry: industries[i % industries.length],
          subIndustry: `${industries[i % industries.length]} Services`,
          sicCode: String(randomInt(1000, 9999)),
          location: ukLocations[i % ukLocations.length],
          locations: pickRandom(ukLocations, randomInt(1, 3)),
          website: `https://${businessNames[i].toLowerCase().replace(/\s+/g, '')}.co.uk`,
          employees: randomInt(10, 200),
          yearEstablished: 2024 - randomInt(10, 30),
          legalStructure: pickRandom(['LTD', 'LLP', 'PLC'])[0] as any,
          propertyIncluded: i % 3 === 0,
          propertyValue: i % 3 === 0 ? randomInt(200, 1000) * 1000 : null,
          stockValue: randomInt(50, 200) * 1000,
          fixtures: randomInt(20, 100) * 1000,
          reasonForSelling: pickRandom([
            'Retirement',
            'Other business interests',
            'Health reasons',
            'Partnership dissolution',
            'Relocating abroad'
          ])[0],
          sellingPoints: [
            'Strong brand recognition',
            'Loyal customer base',
            'Experienced management team',
            'Growth potential',
            'Prime location'
          ].slice(0, randomInt(3, 5)),
          growthOpportunities: 'Significant potential for expansion through online channels and new product lines. International markets remain untapped.',
          competition: 'Limited direct competition in the local market. Strong competitive advantages through established relationships and reputation.',
          relocatable: i % 4 !== 0,
          franchiseOpportunity: i % 5 === 0,
          managementStaying: i % 3 !== 0,
          trainingProvided: true,
          trainingPeriod: ['1 month', '3 months', '6 months'][i % 3],
          status: ['ACTIVE', 'ACTIVE', 'ACTIVE', 'UNDER_OFFER', 'DRAFT'][i] as any,
          listingType: i === 0 ? 'PREMIUM' : 'STANDARD',
          featured: i < 2,
          featuredUntil: i < 2 ? new Date(2025, 0, 31) : null,
          confidential: true,
          ndaRequired: true,
          viewCount: randomInt(100, 1000),
          uniqueViewCount: randomInt(50, 500),
          inquiryCount: randomInt(5, 50),
          favoriteCount: randomInt(10, 100),
          publishedAt: i < 3 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
          expiresAt: i < 3 ? new Date(2025, 11, 31) : null,
        }
      });

      // Add financial data for the last 3 years
      for (let year = 2021; year <= 2023; year++) {
        const yearRevenue = annualRevenue * randomDecimal(0.8, 1.2, 2);
        const yearProfit = yearRevenue * randomDecimal(0.1, 0.3, 2);
        
        await prisma.financialData.create({
          data: {
            businessId: business.id,
            year,
            revenue: yearRevenue,
            grossProfit: yearRevenue * randomDecimal(0.3, 0.6, 2),
            operatingProfit: yearRevenue * randomDecimal(0.15, 0.35, 2),
            netProfit: yearProfit,
            ebitda: yearProfit * randomDecimal(0.8, 1.2, 2),
            cogs: yearRevenue * randomDecimal(0.4, 0.7, 2),
            operatingExpenses: yearRevenue * randomDecimal(0.2, 0.4, 2),
            salaries: yearRevenue * randomDecimal(0.15, 0.35, 2),
            rent: yearRevenue * randomDecimal(0.02, 0.08, 2),
            marketing: yearRevenue * randomDecimal(0.01, 0.05, 2),
            assets: askingPrice * randomDecimal(0.8, 1.5, 2),
            liabilities: askingPrice * randomDecimal(0.2, 0.6, 2),
            equity: askingPrice * randomDecimal(0.4, 0.8, 2),
            workingCapital: yearRevenue * randomDecimal(0.1, 0.3, 2),
            verified: year === 2023,
            verifiedBy: year === 2023 ? 'Smith & Co Accountants' : null,
            verifiedAt: year === 2023 ? new Date() : null,
          }
        });
      }

      // Add business metrics
      await prisma.businessMetric.create({
        data: {
          businessId: business.id,
          metricType: 'revenue_growth',
          value: randomDecimal(-5, 25, 1),
          unit: '%',
          period: 'yearly',
          date: new Date(2023, 11, 31),
          notes: 'Year-over-year revenue growth'
        }
      });

      await prisma.businessMetric.create({
        data: {
          businessId: business.id,
          metricType: 'customer_retention',
          value: randomDecimal(75, 95, 1),
          unit: '%',
          period: 'yearly',
          date: new Date(2023, 11, 31),
          notes: 'Annual customer retention rate'
        }
      });

      // Add keywords for search
      const keywords = [
        industries[i % industries.length].toLowerCase(),
        ukLocations[i % ukLocations.length].toLowerCase(),
        'established',
        'profitable',
        'growth'
      ];

      await Promise.all(
        keywords.map((keyword, idx) =>
          prisma.businessKeyword.create({
            data: {
              businessId: business.id,
              keyword,
              relevance: 10 - idx
            }
          })
        )
      );

      // Add sample documents
      const documentTypes = ['FINANCIAL_STATEMENT', 'TAX_RETURN', 'BUSINESS_PLAN', 'LEASE_AGREEMENT'];
      await Promise.all(
        documentTypes.map((type, idx) =>
          prisma.document.create({
            data: {
              businessId: business.id,
              uploadedBy: seller.id,
              name: `${type.toLowerCase().replace('_', '-')}-2023.pdf`,
              originalName: `${type.toLowerCase().replace('_', '-')}-2023.pdf`,
              type: type as any,
              mimeType: 'application/pdf',
              url: `https://storage.exitmatch.co.uk/documents/${business.id}/${type.toLowerCase()}.pdf`,
              size: randomInt(100000, 5000000),
              category: idx === 0 || idx === 1 ? 'FINANCIAL' : 'LEGAL',
              tags: [type.toLowerCase(), '2023', 'verified'],
              isConfidential: true,
              requiresNda: true,
              verified: idx < 2,
              verifiedBy: idx < 2 ? 'Admin' : null,
              verifiedAt: idx < 2 ? new Date() : null,
              pageCount: randomInt(5, 50),
            }
          })
        )
      );

      // Add business images
      await prisma.businessImage.create({
        data: {
          businessId: business.id,
          url: `https://storage.exitmatch.co.uk/images/${business.id}/main.jpg`,
          thumbnailUrl: `https://storage.exitmatch.co.uk/images/${business.id}/main-thumb.jpg`,
          caption: 'Business premises exterior',
          altText: `${business.title} premises`,
          isPrimary: true,
          isPublic: true,
          order: 0,
          width: 1920,
          height: 1080,
          size: randomInt(500000, 2000000)
        }
      });

      return business;
    })
  );

  // Create Valuations
  console.log('💰 Creating valuations...');

  await Promise.all(
    businesses.slice(0, 3).map(async (business) => {
      const valuation = await prisma.valuation.create({
        data: {
          businessId: business.id,
          requestedBy: business.sellerId,
          valuationType: 'STANDARD',
          revenue: business.annualRevenue || 0,
          profit: business.annualProfit || 0,
          ebitda: business.ebitda || 0,
          assets: randomInt(500, 2000) * 1000,
          industryMultiple: randomDecimal(2, 5, 1),
          assetValue: business.askingPrice ? Number(business.askingPrice) * randomDecimal(0.6, 0.8, 2) : 0,
          earningsValue: business.askingPrice ? Number(business.askingPrice) * randomDecimal(0.8, 1.0, 2) : 0,
          revenueValue: business.askingPrice ? Number(business.askingPrice) * randomDecimal(0.7, 0.9, 2) : 0,
          dcfValue: business.askingPrice ? Number(business.askingPrice) * randomDecimal(0.85, 1.1, 2) : 0,
          finalValuation: business.askingPrice || 0,
          valuationRange: {
            min: business.askingPrice ? Number(business.askingPrice) * 0.85 : 0,
            max: business.askingPrice ? Number(business.askingPrice) * 1.15 : 0,
            confidence: randomInt(70, 95)
          },
          methodology: 'Multiple valuation methods applied including asset-based, earnings-based, and DCF analysis',
          assumptions: {
            growthRate: '5-10% annually',
            discountRate: '12%',
            terminalValue: '3x EBITDA'
          },
          aiScore: randomDecimal(75, 95, 1),
          aiInsights: 'Strong business fundamentals with consistent cash flow. Valuation appears reasonable based on industry comparables.',
          riskFactors: ['Market competition', 'Economic uncertainty', 'Key person dependency'],
          opportunities: ['Digital expansion', 'New product lines', 'Geographic expansion'],
          status: 'COMPLETED',
          validUntil: new Date(2024, 11, 31),
        }
      });

      return valuation;
    })
  );

  // Create Matches
  console.log('🤝 Creating matches...');

  await Promise.all(
    businesses.slice(0, 3).flatMap((business, businessIdx) =>
      buyers.slice(0, 4).map(async (buyer, buyerIdx) => {
        const matchScore = randomInt(65, 95);
        const match = await prisma.match.create({
          data: {
            businessId: business.id,
            buyerId: buyer.id,
            sellerId: business.sellerId,
            matchScore,
            matchFactors: {
              budgetAlignment: randomInt(70, 100),
              industryFit: randomInt(60, 100),
              locationMatch: randomInt(50, 100),
              sizeCompatibility: randomInt(65, 100)
            },
            aiRecommended: matchScore > 80,
            aiConfidence: matchScore > 80 ? randomDecimal(70, 95, 1) : null,
            budgetMatch: true,
            industryMatch: businessIdx % 2 === buyerIdx % 2,
            locationMatch: businessIdx % 3 === buyerIdx % 3,
            sizeMatch: true,
            status: ['PENDING', 'VIEWED', 'INTERESTED', 'NOT_INTERESTED'][buyerIdx % 4] as any,
            buyerInterest: buyerIdx < 2 ? 'HIGH' : buyerIdx < 3 ? 'MEDIUM' : 'LOW',
            sellerInterest: businessIdx < 2 ? 'HIGH' : 'MEDIUM',
            buyerViewedAt: buyerIdx < 3 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
            sellerViewedAt: businessIdx < 3 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
            introducedAt: buyerIdx < 2 && businessIdx < 2 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
            ledToInquiry: buyerIdx === 0 && businessIdx === 0,
            ledToDealRoom: buyerIdx === 0 && businessIdx === 0,
          }
        });
        return match;
      })
    )
  );

  // Create Inquiries
  console.log('📧 Creating inquiries...');

  await Promise.all(
    businesses.slice(0, 3).flatMap((business, businessIdx) =>
      buyers.slice(0, 3).map(async (buyer, buyerIdx) => {
        const inquiry = await prisma.inquiry.create({
          data: {
            businessId: business.id,
            userId: buyer.id,
            subject: `Interest in ${business.title}`,
            message: `I am very interested in learning more about ${business.title}. The business aligns well with our acquisition criteria and we would like to proceed with discussions.`,
            budget: randomInt(business.askingPrice ? Number(business.askingPrice) * 0.8 : 500000, business.askingPrice ? Number(business.askingPrice) * 1.2 : 2000000),
            timeframe: '3-6 months',
            financingStatus: 'Pre-approved',
            phone: `+44 7${randomInt(100000000, 999999999)}`,
            preferredContact: 'email',
            bestTimeToCall: '9am-5pm weekdays',
            status: ['PENDING', 'READ', 'RESPONDED', 'IN_DISCUSSION'][buyerIdx % 4] as any,
            priority: businessIdx === 0 ? 'HIGH' : 'NORMAL',
            readAt: buyerIdx < 3 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
            respondedAt: buyerIdx < 2 ? randomDate(new Date(2024, 0, 1), new Date()) : null,
            responseTime: buyerIdx < 2 ? randomInt(30, 240) : null,
            leadQuality: buyerIdx < 2 ? randomInt(3, 5) : null,
          }
        });

        // Add messages to inquiry
        if (buyerIdx < 2) {
          await prisma.message.create({
            data: {
              inquiryId: inquiry.id,
              userId: business.sellerId,
              content: 'Thank you for your interest. I would be happy to discuss the opportunity further. When would be a good time for a call?',
              isRead: true,
              readAt: new Date(),
            }
          });

          await prisma.message.create({
            data: {
              inquiryId: inquiry.id,
              userId: buyer.id,
              content: 'I am available for a call tomorrow afternoon or any time on Thursday. Please let me know what works best for you.',
              isRead: false,
            }
          });
        }

        return inquiry;
      })
    )
  );

  // Create Deal Rooms for top matches
  console.log('📁 Creating deal rooms...');

  const dealRoom = await prisma.dealRoom.create({
    data: {
      businessId: businesses[0].id,
      referenceCode: `DR${2024}0001`,
      name: `${businesses[0].title} - Acquisition Deal`,
      sellerId: businesses[0].sellerId,
      primaryBuyerId: buyers[0].id,
      advisorId: advisors[0].advisorProfile?.id,
      dealType: 'ACQUISITION',
      dealValue: businesses[0].askingPrice || 0,
      status: 'ACTIVE',
      stage: 'DUE_DILIGENCE',
      ndaSignedDate: new Date(2024, 0, 15),
      loiDate: new Date(2024, 1, 1),
      dueDiligenceStart: new Date(2024, 1, 15),
      dueDiligenceEnd: new Date(2024, 3, 15),
      expectedClosing: new Date(2024, 5, 1),
      documentsCount: 25,
      totalViews: 150,
      lastActivityAt: new Date(),
    }
  });

  // Add deal room access
  await prisma.dealRoomAccess.create({
    data: {
      dealRoomId: dealRoom.id,
      userId: buyers[0].id,
      role: 'BUYER',
      permissions: ['read', 'write'],
      invitedBy: sellers[0].id,
      acceptedAt: new Date(2024, 0, 16),
      lastAccessAt: new Date(),
      accessCount: 45,
    }
  });

  await prisma.dealRoomAccess.create({
    data: {
      dealRoomId: dealRoom.id,
      userId: sellers[0].id,
      role: 'SELLER',
      permissions: ['read', 'write', 'delete', 'invite', 'manage'],
      acceptedAt: new Date(2024, 0, 15),
      lastAccessAt: new Date(),
      accessCount: 120,
    }
  });

  // Add deal room tasks
  await prisma.dealRoomTask.create({
    data: {
      dealRoomId: dealRoom.id,
      title: 'Complete financial due diligence',
      description: 'Review all financial statements and verify accuracy',
      assignedTo: buyers[0].id,
      dueDate: new Date(2024, 2, 15),
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      createdBy: sellers[0].id,
    }
  });

  await prisma.dealRoomTask.create({
    data: {
      dealRoomId: dealRoom.id,
      title: 'Legal document review',
      description: 'Review all contracts and legal agreements',
      assignedTo: advisors[0].id,
      dueDate: new Date(2024, 2, 20),
      priority: 'HIGH',
      status: 'PENDING',
      createdBy: sellers[0].id,
    }
  });

  // Add deal room milestones
  await prisma.dealRoomMilestone.create({
    data: {
      dealRoomId: dealRoom.id,
      title: 'NDA Signed',
      description: 'Non-disclosure agreement executed by all parties',
      targetDate: new Date(2024, 0, 15),
      completedDate: new Date(2024, 0, 15),
      status: 'COMPLETED',
      order: 1,
    }
  });

  await prisma.dealRoomMilestone.create({
    data: {
      dealRoomId: dealRoom.id,
      title: 'Due Diligence Complete',
      description: 'All due diligence activities completed',
      targetDate: new Date(2024, 3, 15),
      status: 'IN_PROGRESS',
      order: 2,
    }
  });

  // Create NDA signatures
  console.log('📝 Creating NDA signatures...');

  await prisma.nDASignature.create({
    data: {
      userId: buyers[0].id,
      businessId: businesses[0].id,
      signedName: buyers[0].name || 'Buyer 1',
      signedTitle: 'Managing Director',
      signedCompany: 'Acquisition Corp',
      ndaVersion: '2.0',
      ndaText: 'Standard NDA agreement text...',
      termsAccepted: true,
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
      verified: true,
      validUntil: new Date(2025, 11, 31),
    }
  });

  // Create saved searches
  console.log('🔍 Creating saved searches...');

  await Promise.all(
    buyers.slice(0, 3).map(async (buyer, i) => {
      await prisma.savedSearch.create({
        data: {
          userId: buyer.id,
          name: `${industries[i]} opportunities`,
          description: `Looking for ${industries[i]} businesses in my budget range`,
          criteria: {
            industries: [industries[i]],
            minPrice: 500000,
            maxPrice: 5000000,
            locations: pickRandom(ukLocations, 3),
            minRevenue: 1000000,
          },
          emailAlert: true,
          alertFrequency: 'WEEKLY',
          lastAlertSent: randomDate(new Date(2024, 0, 1), new Date()),
          searchCount: randomInt(10, 50),
          lastSearched: new Date(),
          resultsCount: randomInt(5, 20),
        }
      });
    })
  );

  // Create favorite listings
  console.log('⭐ Creating favorite listings...');

  await Promise.all(
    buyers.slice(0, 4).flatMap((buyer, buyerIdx) =>
      businesses.slice(0, 2).map(async (business) => {
        await prisma.favoriteListing.create({
          data: {
            userId: buyer.id,
            businessId: business.id,
            notes: 'Interesting opportunity, meets most of our criteria',
            rating: randomInt(3, 5),
            tags: ['high-potential', 'good-location', 'profitable'],
            lastViewedAt: new Date(),
            viewCount: randomInt(1, 10),
            priceAlerts: buyerIdx < 2,
            statusAlerts: true,
          }
        });
      })
    )
  );

  // Create notifications
  console.log('🔔 Creating notifications...');

  await Promise.all(
    [...sellers, ...buyers.slice(0, 4)].map(async (user, i) => {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: ['NEW_INQUIRY', 'NEW_MATCH', 'LISTING_VIEW_MILESTONE', 'PRICE_CHANGE'][i % 4] as any,
          title: ['New Inquiry Received', 'New Match Found', 'Listing Milestone', 'Price Update'][i % 4],
          message: 'You have a new notification',
          entityType: 'business',
          entityId: businesses[0].id,
          actionUrl: `/dashboard/notifications`,
          channels: ['email', 'in-app'],
          emailSent: i < 3,
          isRead: i > 2,
          readAt: i > 2 ? new Date() : null,
          priority: i === 0 ? 'HIGH' : 'NORMAL',
        }
      });
    })
  );

  // Create subscriptions
  console.log('💳 Creating subscriptions...');

  await Promise.all(
    [...sellers.slice(0, 3), ...buyers.slice(0, 2)].map(async (user, i) => {
      const subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: `plan_${i}`,
          planName: ['Starter', 'Professional', 'Enterprise'][i % 3],
          planType: ['STARTER', 'PROFESSIONAL', 'ENTERPRISE'][i % 3] as any,
          amount: [99, 299, 599][i % 3],
          currency: 'GBP',
          interval: 'MONTHLY',
          status: 'ACTIVE',
          currentPeriodStart: new Date(2024, 0, 1),
          currentPeriodEnd: new Date(2024, 1, 1),
          listingsLimit: [1, 5, -1][i % 3] || undefined,
          featuredListings: [0, 2, -1][i % 3] || undefined,
          dealRoomsLimit: [1, 10, -1][i % 3] || undefined,
          stripeSubscriptionId: `sub_${randomInt(1000000, 9999999)}`,
          stripeCustomerId: `cus_${randomInt(1000000, 9999999)}`,
        }
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: user.id,
          subscriptionId: subscription.id,
          amount: subscription.amount,
          currency: 'GBP',
          description: `${subscription.planName} Plan - Monthly`,
          status: 'SUCCEEDED',
          paymentMethod: 'card',
          last4: String(randomInt(1000, 9999)),
          stripePaymentIntentId: `pi_${randomInt(1000000, 9999999)}`,
          stripeChargeId: `ch_${randomInt(1000000, 9999999)}`,
          paidAt: new Date(),
        }
      });
    })
  );

  // Create reviews
  console.log('⭐ Creating reviews...');

  await prisma.review.create({
    data: {
      authorId: buyers[0].id,
      targetId: sellers[0].id,
      overallRating: 5,
      communicationRating: 5,
      professionalismRating: 5,
      responsivenessRating: 4,
      trustworthinessRating: 5,
      title: 'Excellent seller',
      comment: 'Very professional and transparent throughout the process. All documentation was well organized and questions were answered promptly.',
      wouldRecommend: true,
      verified: true,
      verifiedDeal: true,
      status: 'APPROVED',
      moderatedAt: new Date(),
    }
  });

  await prisma.review.create({
    data: {
      authorId: sellers[0].id,
      targetId: buyers[0].id,
      overallRating: 4,
      communicationRating: 4,
      professionalismRating: 5,
      responsivenessRating: 4,
      trustworthinessRating: 5,
      title: 'Serious buyer',
      comment: 'Professional buyer with clear requirements. Due diligence process was thorough but fair.',
      wouldRecommend: true,
      verified: true,
      status: 'APPROVED',
      moderatedAt: new Date(),
    }
  });

  // Create activity logs
  console.log('📊 Creating activity logs...');

  await Promise.all(
    [...sellers, ...buyers].map(async (user) => {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          activityType: 'login',
          description: 'User logged in',
          ipAddress: `192.168.1.${randomInt(1, 255)}`,
          userAgent: 'Mozilla/5.0',
          device: ['desktop', 'mobile', 'tablet'][randomInt(0, 2)],
          browser: ['Chrome', 'Firefox', 'Safari'][randomInt(0, 2)],
          country: 'United Kingdom',
          city: ukLocations[randomInt(0, ukLocations.length - 1)],
        }
      });
    })
  );

  console.log('✅ Seed completed successfully!');
  
  // Summary
  console.log('\n📊 Database Summary:');
  console.log(`- Users: ${sellers.length + buyers.length + advisors.length + 1} (${sellers.length} sellers, ${buyers.length} buyers, ${advisors.length} advisors, 1 admin)`);
  console.log(`- Businesses: ${businesses.length}`);
  console.log(`- Deal Rooms: 1`);
  console.log(`- Inquiries: ${businesses.slice(0, 3).length * buyers.slice(0, 3).length}`);
  console.log(`- Matches: ${businesses.slice(0, 3).length * buyers.slice(0, 4).length}`);
  
  console.log('\n🔑 Test Accounts:');
  console.log('- Admin: admin@exitmatch.co.uk');
  console.log('- Sellers: seller1@example.com - seller5@example.com');
  console.log('- Buyers: buyer1@example.com - buyer8@example.com');
  console.log('- Advisors: advisor1@example.com - advisor3@example.com');
  console.log('- Password for all: password123');
}

// Execute seed
seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });