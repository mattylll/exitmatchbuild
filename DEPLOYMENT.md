# ExitMatch Production Deployment Guide

## 🚀 Quick Production Checklist

### 1. Database Setup (Choose One)

#### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the database URL from Settings > Database
3. Run database migrations: `npx prisma db push`

#### Option B: PlanetScale
1. Go to [planetscale.com](https://planetscale.com) and create a new database
2. Copy the connection string
3. Run: `npx prisma db push`

#### Option C: Neon
1. Go to [neon.tech](https://neon.tech) and create a new database
2. Copy the connection string
3. Run: `npx prisma db push`

### 2. Deploy to Vercel (Recommended)

#### Step-by-Step Vercel Deployment:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project dashboard
   - Navigate to Settings > Environment Variables
   - Add all required variables from the list below

### 3. Required Environment Variables

#### Essential (Must Have):
```bash
DATABASE_URL="your-postgres-connection-string"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-a-secure-random-string-32chars+"
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

#### OAuth (Recommended):
```bash
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-secret"
# Get these from Google Console: console.developers.google.com
```

#### Optional (For Full Features):
```bash
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@exitmatch.co.uk"
OPENAI_API_KEY="your-openai-key-for-ai-features"
MIXPANEL_TOKEN="your-analytics-token"
```

### 4. Generate Secure Secrets

Generate a secure NextAuth secret:
```bash
openssl rand -base64 32
```

### 5. Domain Setup

#### Custom Domain (exitmatch.co.uk):
1. In Vercel dashboard, go to Domains
2. Add your domain: `exitmatch.co.uk` and `www.exitmatch.co.uk`
3. Configure DNS records as instructed by Vercel
4. Update NEXTAUTH_URL and NEXT_PUBLIC_APP_URL to your custom domain

### 6. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-domain.com/api/auth/callback/google`
6. Copy Client ID and Secret to environment variables

### 7. Database Migration

After deployment:
```bash
# Connect to production database and run:
npx prisma generate
npx prisma db push
```

### 8. Post-Deployment Verification

Check these URLs work:
- ✅ `https://your-domain.com` - Homepage loads
- ✅ `https://your-domain.com/about` - About page loads  
- ✅ `https://your-domain.com/valuation` - Valuation tool works
- ✅ `https://your-domain.com/auth/login` - Login page loads
- ✅ `https://your-domain.com/api/health` - API health check

## 🔧 Alternative Deployment Options

### Netlify
```bash
npm run build
# Deploy the .next folder to Netlify
```

### Railway
1. Connect GitHub repo to Railway
2. Set environment variables
3. Deploy automatically

### DigitalOcean App Platform
1. Create new app from GitHub
2. Set build command: `npm run build`
3. Set run command: `npm start`

## 📊 Production Monitoring

### Recommended Tools:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **LogRocket** - User session replay
- **Mixpanel** - User analytics

### Performance Optimization:
- Enable Vercel Edge Functions
- Configure CDN for static assets
- Set up database connection pooling
- Enable gzip compression

## 🔒 Security Checklist

- ✅ NEXTAUTH_SECRET is secure and unique
- ✅ Database credentials are not exposed
- ✅ API keys are in environment variables only
- ✅ HTTPS is enabled (automatic with Vercel)
- ✅ Rate limiting is configured
- ✅ CORS is properly configured

## 🚨 Production Issues & Solutions

### Common Issues:

1. **"Authentication not working"**
   - Check NEXTAUTH_URL matches exact domain
   - Verify OAuth redirect URIs
   - Check environment variables are set

2. **"Database connection failed"**
   - Verify DATABASE_URL format
   - Check database is accepting connections
   - Ensure firewall allows connections

3. **"Build fails"**
   - Run `npm run build` locally first
   - Check for TypeScript errors
   - Verify all environment variables

### Support:
- GitHub Issues: [Create issue](https://github.com/your-repo/issues)
- Email: support@exitmatch.co.uk

---

## 🎯 Next Steps After Deployment

1. **Set up monitoring and alerts**
2. **Configure backup strategy**
3. **Set up CI/CD pipeline**
4. **Add SSL monitoring**
5. **Set up staging environment**
6. **Configure logging**
7. **Add performance monitoring**

Your ExitMatch platform is now ready for production! 🚀