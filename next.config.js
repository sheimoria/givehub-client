module.exports = {
  reactStrictMode: true,
  env: {
    serverUrl: 'https://api.givehub.club/graphql'
  },
  images: {
    domains: ['images.unsplash.com']
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(new webpack.IgnorePlugin(/lib\/server/))
    }

    return config
  }
}
