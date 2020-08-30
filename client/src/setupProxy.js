const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use('/api/auth/google',
    //     createProxyMiddleware({
    //         target: 'https://accounts.google.com/',
    //         changeOrigin: true,
    //         // pathRewrite: { '^/api': '/https://accounts.google.com/' }
    //     }))
    app.use('/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        }))
    // app.use('/api/auth/register_login',
    //     createProxyMiddleware({
    //         target: 'http://localhost:3001',
    //         changeOrigin: true,
    //     }))
}