module.exports = {
  apps: [
    {
      name: 'mo-app',
      script: 'npm',
      args: 'start',
      cwd: '/home/ubuntu/dev/mo-frontend',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '100M',
      node_args: '--max-old-space-size=80',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};

