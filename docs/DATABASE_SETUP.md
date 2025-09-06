# Database Setup & Migration Guide for ExitMatch

## Overview

ExitMatch uses PostgreSQL as its primary database with Prisma as the ORM. The database schema is designed to handle M&A transactions, user management, business listings, valuations, deal rooms, and comprehensive audit trails.

## Initial Setup

### 1. Prerequisites

- PostgreSQL 14+ installed
- Node.js 20+ installed
- pnpm package manager

### 2. Environment Configuration

Create a `.env` file in the project root with:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/exitmatch?schema=public"

# Direct URL for migrations (without connection pooling)
DIRECT_URL="postgresql://username:password@localhost:5432/exitmatch?schema=public"
```

For production with connection pooling:

```env
# Pooled connection for application
DATABASE_URL="postgresql://username:password@host:5432/exitmatch?schema=public&pgbouncer=true"

# Direct connection for migrations
DIRECT_URL="postgresql://username:password@host:5432/exitmatch?schema=public"
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Generate Prisma Client

```bash
pnpm db:generate
```

### 5. Create Database & Run Migrations

```bash
# Create the database and apply all migrations
pnpm db:migrate

# Or push the schema directly (development only)
pnpm db:push
```

### 6. Seed the Database

```bash
pnpm db:seed
```

This will populate the database with:
- Admin user (admin@exitmatch.co.uk)
- 5 seller accounts with businesses
- 8 buyer accounts with profiles
- 3 advisor accounts
- Sample valuations, matches, inquiries, and deal rooms

## Database Scripts

### Available Commands

```bash
# Generate Prisma client
pnpm db:generate

# Create and apply migrations
pnpm db:migrate

# Push schema changes (dev only, no migration files)
pnpm db:push

# Seed the database
pnpm db:seed

# Reset database (drop, recreate, migrate, seed)
pnpm db:reset

# Open Prisma Studio (GUI for database)
pnpm db:studio
```

## Migration Strategy

### Development Workflow

1. Make schema changes in `prisma/schema.prisma`
2. Create migration: `pnpm db:migrate`
3. Name the migration descriptively (e.g., `add_user_profiles`)
4. Test migration locally
5. Commit both schema and migration files

### Production Deployment

1. **Backup First**: Always backup production database
2. **Run Migrations**: `pnpm prisma migrate deploy`
3. **Verify**: Check migration status with `pnpm prisma migrate status`
4. **Rollback Plan**: Keep previous schema version ready

### Migration Best Practices

#### Safe Migrations

- **Adding Columns**: Make nullable first, then add constraints
- **Removing Columns**: Deprecate first, remove after code deployment
- **Renaming**: Use two-step process (add new, migrate data, remove old)
- **Indexes**: Add concurrently in production to avoid locks

Example safe column addition:

```prisma
// Step 1: Add nullable column
model User {
  newField String?
}

// Step 2: Backfill data
// Step 3: Make required (if needed) in next release
model User {
  newField String
}
```

#### Dangerous Operations

Avoid in production without careful planning:
- Dropping tables or columns with data
- Changing column types
- Adding NOT NULL constraints to existing columns
- Removing or modifying unique constraints

## Performance Optimization

### Key Indexes

The schema includes indexes for:

1. **Foreign Keys**: All relations are indexed
2. **Query Patterns**: Common filter fields
3. **Composite Indexes**: Multi-field searches
4. **Soft Deletes**: `deletedAt` fields indexed

### Query Optimization Tips

```typescript
// Use select to limit fields
const businesses = await prisma.business.findMany({
  select: {
    id: true,
    title: true,
    askingPrice: true
  }
});

// Use pagination
const results = await prisma.business.findMany({
  skip: 20,
  take: 10
});

// Use includes wisely
const businessWithRelations = await prisma.business.findUnique({
  where: { id },
  include: {
    financials: true,
    documents: {
      where: { deletedAt: null }
    }
  }
});
```

## Backup Strategy

### Automated Backups

For production, implement:

1. **Daily Full Backups**
   ```bash
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **Point-in-Time Recovery**
   - Enable WAL archiving
   - Store backups in cloud storage (S3, GCS)

3. **Backup Retention**
   - Daily: Keep for 7 days
   - Weekly: Keep for 4 weeks
   - Monthly: Keep for 12 months

### Manual Backup

```bash
# Export full database
pg_dump $DATABASE_URL > exitmatch_backup.sql

# Export specific tables
pg_dump $DATABASE_URL -t users -t businesses > partial_backup.sql

# Restore from backup
psql $DATABASE_URL < exitmatch_backup.sql
```

## Data Privacy & GDPR Compliance

### Soft Deletes

Most models support soft deletion via `deletedAt` field:

```typescript
// Soft delete
await dbUtils.softDelete(prisma, 'Business', businessId);

// Restore
await dbUtils.softRestore(prisma, 'Business', businessId);

// Query excluding soft-deleted
const activeBusinesses = await prisma.business.findMany({
  where: dbUtils.excludeSoftDeleted()
});
```

### Data Retention

- User data: Soft delete, retain for 30 days, then hard delete
- Business listings: Archive after 1 year of inactivity
- Audit logs: Retain for 7 years (legal requirement)
- Financial data: Retain for 6 years (UK requirement)

### Right to be Forgotten

```typescript
// Anonymize user data
async function anonymizeUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      email: `deleted_${userId}@deleted.com`,
      name: 'Deleted User',
      image: null,
      deletedAt: new Date()
    }
  });
}
```

## Monitoring & Maintenance

### Health Checks

```sql
-- Check database size
SELECT pg_database_size('exitmatch');

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT 
  query,
  calls,
  mean_exec_time,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### Regular Maintenance

```sql
-- Analyze tables for query planner
ANALYZE;

-- Vacuum to reclaim space
VACUUM ANALYZE;

-- Reindex for performance
REINDEX DATABASE exitmatch;
```

## Troubleshooting

### Common Issues

1. **Migration Fails**
   ```bash
   # Check migration status
   pnpm prisma migrate status
   
   # Resolve failed migration
   pnpm prisma migrate resolve --applied <migration_name>
   ```

2. **Connection Issues**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check firewall/security groups
   - Verify SSL requirements

3. **Performance Issues**
   - Run `EXPLAIN ANALYZE` on slow queries
   - Check missing indexes
   - Monitor connection pool size
   - Review query patterns

### Debug Mode

```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Log slow queries
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
  ],
});

prisma.$on('query', (e) => {
  if (e.duration > 100) {
    console.log('Slow query:', e.query, 'Duration:', e.duration);
  }
});
```

## Security Best Practices

1. **Connection Security**
   - Use SSL for database connections
   - Rotate credentials regularly
   - Use connection pooling

2. **Access Control**
   - Implement row-level security where needed
   - Use read-only replicas for analytics
   - Limit database user permissions

3. **Data Encryption**
   - Encrypt sensitive fields at application level
   - Use PostgreSQL's pgcrypto for database-level encryption
   - Implement field-level encryption for PII

4. **Audit Trail**
   - All data modifications logged in AuditLog
   - Track user actions in ActivityLog
   - Monitor suspicious patterns

## Support & Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- Database monitoring: Set up with Datadog/New Relic
- Backup monitoring: CloudWatch/Stackdriver alerts

For issues, contact the development team or check the internal wiki.