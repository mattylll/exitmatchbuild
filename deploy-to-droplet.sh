#!/bin/bash

# DigitalOcean Droplet Deployment Script
# Run this from your local machine

DROPLET_IP="209.38.166.209"
APP_NAME="exitmatch"
REMOTE_APP_DIR="/var/www/$APP_NAME"

echo "🚀 Starting deployment to DigitalOcean Droplet at $DROPLET_IP"

# Create deployment package (excluding unnecessary files)
echo "📦 Creating deployment package..."
tar czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=.env.local \
  --exclude=deploy.tar.gz \
  --exclude=*.log \
  --exclude=.DS_Store \
  .

echo "📤 Uploading files to droplet..."
scp deploy.tar.gz root@$DROPLET_IP:/tmp/

echo "🔧 Setting up application on droplet..."
ssh root@$DROPLET_IP << 'ENDSSH'
set -e

echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "Installing PM2..."
npm install -g pm2

echo "Installing nginx..."
apt-get install -y nginx

echo "Creating app directory..."
mkdir -p /var/www/exitmatch
cd /var/www/exitmatch

echo "Extracting files..."
tar xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz

echo "Installing dependencies..."
npm ci --only=production

echo "Building Next.js application..."
npm run build

echo "Setting up PM2..."
pm2 delete exitmatch 2>/dev/null || true
pm2 start npm --name exitmatch -- start
pm2 save
pm2 startup systemd -u root --hp /root
pm2 save

echo "✅ Application started with PM2"
ENDSSH

echo "🌐 Configuring nginx..."
ssh root@$DROPLET_IP << 'ENDSSH'
cat > /etc/nginx/sites-available/exitmatch << 'EOF'
server {
    listen 80;
    server_name 209.38.166.209;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/exitmatch /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo "✅ Nginx configured and restarted"
ENDSSH

echo "🎉 Deployment complete!"
echo "📱 Your app is now available at: http://$DROPLET_IP"
echo ""
echo "Useful commands:"
echo "  SSH into droplet: ssh root@$DROPLET_IP"
echo "  View PM2 status:  ssh root@$DROPLET_IP 'pm2 status'"
echo "  View app logs:    ssh root@$DROPLET_IP 'pm2 logs exitmatch'"
echo "  Restart app:      ssh root@$DROPLET_IP 'pm2 restart exitmatch'"

# Clean up local deployment package
rm -f deploy.tar.gz