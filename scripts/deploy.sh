#!/bin/bash

# ExitMatch Production Deployment Script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 ExitMatch Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Error: Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ Error: npm is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

# Run build to check for errors
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Check if Vercel CLI is installed
if command -v vercel >/dev/null 2>&1; then
    echo "🚀 Deploying to Vercel..."
    
    # Ask user if they want to deploy
    read -p "Deploy to production? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel --prod
        echo "🎉 Deployment complete!"
        echo ""
        echo "Next steps:"
        echo "1. Set up environment variables in Vercel dashboard"
        echo "2. Configure your custom domain"
        echo "3. Set up database migrations"
        echo ""
        echo "📖 See DEPLOYMENT.md for detailed instructions"
    else
        echo "Deployment cancelled"
    fi
else
    echo "⚠️  Vercel CLI not found. Install it with:"
    echo "   npm i -g vercel"
    echo ""
    echo "Alternative deployment options:"
    echo "1. Push to GitHub and connect to Vercel/Netlify"
    echo "2. Use Docker with provided Dockerfile"
    echo "3. Deploy to any Node.js hosting provider"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
fi

echo ""
echo "🎯 Production checklist:"
echo "□ Database set up (Supabase/PlanetScale/Neon)"
echo "□ Environment variables configured"
echo "□ OAuth providers configured (Google)"
echo "□ Custom domain configured"
echo "□ SSL certificate enabled"
echo "□ Database migrations run"
echo "□ Test all functionality"
echo ""
echo "📊 Monitor your deployment:"
echo "□ Set up error tracking (Sentry)"
echo "□ Configure analytics (Mixpanel)"
echo "□ Set up uptime monitoring"