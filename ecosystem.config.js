module.exports = {
  apps: [{
    name: 'exitmatch',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '900M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}