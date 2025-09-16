# ExitMatch Digital Ocean Deployment Guide

## Quick Setup for Demo/Showcase

This repository has been configured to run without a database for demonstration purposes.

### Prerequisites
- Digital Ocean account
- Digital Ocean CLI installed (optional)
- Node.js 20.x

### Deployment via Digital Ocean App Platform

#### Option 1: Using GitHub Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Digital Ocean deployment"
   git push origin main
   ```

2. **Create App in Digital Ocean**
   - Go to Digital Ocean App Platform
   - Click "Create App"
   - Select GitHub as source
   - Choose repository: `mattylll/exitmatchbuild`
   - Select branch: `main`

3. **Configure Build Settings**
   - Build Command: `npm install --legacy-peer-deps && npm run build`
   - Output Directory: Leave empty (Next.js handles this)
   - Run Command: `npm start`

4. **Set Environment Variables**
   Add these in the App Platform settings:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_DEMO_MODE=true
   NEXT_PUBLIC_APP_URL=https://your-app.ondigitalocean.app
   NEXTAUTH_URL=https://your-app.ondigitalocean.app
   NEXTAUTH_SECRET=demo-secret-not-for-production-use-32chars
   DATABASE_URL=postgresql://user:password@localhost:5432/exitmatch
   NEXT_PUBLIC_ENABLE_ANALYTICS=false
   NEXT_PUBLIC_ENABLE_3D_ANIMATIONS=false
   RATE_LIMIT_ENABLED=false
   ```

5. **Deploy**
   - Click "Next" and review settings
   - Choose instance size (Basic XXS is sufficient for demo)
   - Click "Create Resources"

#### Option 2: Using DO CLI

```bash
doctl apps create --spec .do/app.yaml
```

### What Works in Demo Mode

✅ **Working Features:**
- Homepage and landing pages
- About page
- Contact page
- Seller information pages
- Buyer information pages
- Valuation tool (calculations only, no saving)
- Static content and navigation
- All visual components and UI

❌ **Disabled Features (No Database):**
- User registration/login
- Saving valuations
- Deal room functionality
- User dashboards
- Data persistence

### Post-Deployment

1. **Access your app**
   - Your app will be available at: `https://[app-name].ondigitalocean.app`

2. **Custom Domain (Optional)**
   - In Digital Ocean App Platform settings
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Troubleshooting

**Build Failures:**
- Ensure Node version is set to 20.x
- Use `npm install --legacy-peer-deps` to handle peer dependency conflicts

**Runtime Errors:**
- Check environment variables are set correctly
- Verify `NEXT_PUBLIC_DEMO_MODE=true` is set

**Page Not Loading:**
- Check build logs in Digital Ocean console
- Verify port is set to 3000
- Ensure run command is `npm start`

### Moving to Production

When ready for production with full functionality:

1. Set up a PostgreSQL database (Digital Ocean Managed Database recommended)
2. Update `DATABASE_URL` with real connection string
3. Set `NEXT_PUBLIC_DEMO_MODE=false`
4. Configure OAuth providers (Google, LinkedIn)
5. Set up SendGrid for emails
6. Generate secure `NEXTAUTH_SECRET`
7. Run database migrations: `npx prisma db push`

### Support

For issues specific to this demo deployment:
- Check Digital Ocean App Platform logs
- Review build output for errors
- Ensure all environment variables are set

This configuration bypasses Netlify-specific issues and uses npm directly for compatibility.