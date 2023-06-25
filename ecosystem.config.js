module.exports = {
  apps: [
    {
      name: "buoy-platform",
      script: "yarn start",
      env: {
        NODE_ENV: "development",
      },
      env_file: "./server/.env",
    },
  ],
}
