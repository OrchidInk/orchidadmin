module.exports = {
  apps: [
    {
      name: "orchid-admin",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/home/cloudmn/orchidadmin",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};

