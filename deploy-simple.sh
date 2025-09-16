#!/bin/bash

# Simple deployment to your existing droplet
DROPLET_IP="209.38.166.209"

echo "🚀 Deploying to $DROPLET_IP"

# Create deployment package
tar czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .

# Upload and deploy
cat deploy.tar.gz | ssh root@$DROPLET_IP "
  cd /var/www && rm -rf exitmatch && mkdir exitmatch && cd exitmatch &&
  tar xzf - &&
  npm ci --only=production &&
  npm run build &&
  (pm2 delete exitmatch 2>/dev/null || true) &&
  pm2 start npm --name exitmatch -- start &&
  pm2 save
"

rm deploy.tar.gz
echo "✅ Deployed! Visit http://$DROPLET_IP"