// const proxy = require('http-proxy-middleware')
// module.exports = function (app) {
//     // app.use(apiProxy);
//     // app.use(api2)
//     app.use(
//         proxy('/api', {  // 遇见 /api1 前缀的请求 就会触发该代理配置
//             target: 'http://localhost:9999/', // 请求转发给谁
//             changeOrigin: true, // 控制服务器接收到的请求头Host的值 
//             // 重新请求路径 把 /api1 替换为空字符串 必须加
//             pathRewrite: { '^/api1': '' }
//         }),
//         proxy('/api2', { // 遇见 /api2前缀的请求 就会触发该代理配置
//             target: 'https://view.inews.qq.com/',
//             changeOrigin: true,
//             // 把api 替换为空字符串
//             pathRewrite: { '^/api2': '' }
//         }),

//     )
// };

// const { createProxyMiddleware } = require('http-proxy-middleware');
// const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:9999/', changeOrigin: true });
// const api2 = createProxyMiddleware('/g2', { target: 'https://view.inews.qq.com/', changeOrigin: true, pathRewrite: { '^/g2': '' } })
// module.exports = function (app) {
//     app.use(apiProxy);
//     app.use(api2)

// };

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/g2', {
        target: 'https://view.inews.qq.com',
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/api', { // 遇见 /api 前缀的请求 就会触发该代理配置
        target: 'http://localhost:9999/',// 请求转发给谁
        changeOrigin: true// 控制服务器接收到的请求头Host的值
    }))
    app.use(createProxyMiddleware('/news', {
        target: 'https://interface.sina.cn/',
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/ncov', {
        target: 'http://api.tianapi.com/',
        changeOrigin: true,
    }))
    app.use(createProxyMiddleware('/pages', {
        target: 'https://api.webhunt.cn/api/v1',
        changeOrigin: true,
    }))

}