const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dadosabertos.camara.leg.br',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove o prefixo '/api' da URL da requisição
      },
    })
  );
};
