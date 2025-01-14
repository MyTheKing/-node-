module.exports = {
    apps: [{
      name: 'myapp',
      script: './bin/www',
      // 集群模式,进程数取决于CPU核心数,设置负载
    //   instances: "max",
      instances: "1",
      exec_mode: "cluster",//启动模式
      watch: true,//监听代码改变时重启
      max_memory_restart: '1000M',//内存超500M时重启
      error_file: "./pm2-err.log",//报错日志
      out_file: "./pm2-out.log",//输出日志
      log_date_format: "YYYY-MM-DD HH:mm:ss",//日志时间格式
      merge_logs: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    }],
  };