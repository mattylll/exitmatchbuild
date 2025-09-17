#!/bin/bash

# Direct deployment to your Droplet - No GitHub needed!
DROPLET_IP="209.38.166.209"

echo "🚀 Direct deployment to Droplet (no GitHub required)"

# Build locally first
echo "📦 Building locally..."
npm run build

# Create a deployment package
tar czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.next/cache' \
  .next package.json package-lock.json public

# Transfer and deploy
echo "📤 Deploying to $DROPLET_IP..."
scp deploy.tar.gz root@$DROPLET_IP:/tmp/

ssh root@$DROPLET_IP << 'EOF'
  # Install Node if needed
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    npm install -g pm2
  fi
  
  # Deploy app
  mkdir -p /var/www/app
  cd /var/www/app
  tar xzf /tmp/deploy.tar.gz
  npm ci --production
  
  # Start with PM2
  pm2 stop app 2>/dev/null || true
  PORT=80 pm2 start npm --name app -- start
  pm2 save
EOF

echo "✅ Deployed! Visit http://$DROPLET_IP"
rm deploy.tar.gz