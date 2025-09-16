#!/bin/bash

# Quick deployment script - minimal setup for demo
DROPLET_IP="209.38.166.209"

echo "🚀 Quick Deploy to $DROPLET_IP"

# Build locally first to ensure it works
echo "📦 Building project locally..."
cd exitmatchbuild
npm run build || exit 1

# Create minimal deployment archive
echo "📤 Creating and uploading deployment package..."
tar czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=*.log \
  package.json package-lock.json \
  next.config.ts tailwind.config.js tsconfig.json \
  .env.production ecosystem.config.js \
  app components lib styles public \
  prisma

scp deploy.tar.gz root@$DROPLET_IP:/tmp/

# Deploy on droplet
ssh root@$DROPLET_IP << 'ENDSSH'
set -e
cd /var/www/exitmatch 2>/dev/null || mkdir -p /var/www/exitmatch
cd /var/www/exitmatch
tar xzf /tmp/deploy.tar.gz
cp .env.production .env
npm ci --only=production
npm run build
pm2 restart exitmatch || pm2 start ecosystem.config.js
ENDSSH

echo "✅ Deployment complete! Visit http://$DROPLET_IP"