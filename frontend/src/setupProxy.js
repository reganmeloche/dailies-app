const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001/api',
      changeOrigin: true,
      secure: false, // Disable SSL verification (useful for local development)
    })
  );
};