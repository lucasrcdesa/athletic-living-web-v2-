const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/CadastrarAlunos',
    createProxyMiddleware({
      target: 'https://athleticlivingback-production-38d9.up.railway.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔧 Proxy Request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('🔧 Proxy Response:', proxyRes.statusCode, req.url);
      },
      onError: (err, req, res) => {
        console.error('🔧 Proxy Error:', err.message);
      }
    })
  );

  app.use(
    '/alunos',
    createProxyMiddleware({
      target: 'https://athleticlivingback-production-38d9.up.railway.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔧 Proxy Request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('🔧 Proxy Response:', proxyRes.statusCode, req.url);
      },
      onError: (err, req, res) => {
        console.error('🔧 Proxy Error:', err.message);
      }
    })
  );

  // Proxy para todos os outros endpoints
  app.use(
    ['/colaboradores', '/treinos', '/exercicios', '/atendimentos', '/avaliacoes', '/notificacoes', '/feed', '/financeiro', '/macrociclos', '/mesociclos', '/microciclos', '/pontos'],
    createProxyMiddleware({
      target: 'https://athleticlivingback-production-38d9.up.railway.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('🔧 Proxy Request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('🔧 Proxy Response:', proxyRes.statusCode, req.url);
      },
      onError: (err, req, res) => {
        console.error('🔧 Proxy Error:', err.message);
      }
    })
  );
}; 