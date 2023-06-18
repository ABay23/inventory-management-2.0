// create proxy to backend https://papelon.onrender.com using http-proxy-middleware
//
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://papelon.onrender.com',
      changeOrigin: true,
    })
  )
}

// Where can I use the proxy? to make requests to the backend?
// You can use the proxy in the following ways:
// 1. In the frontend, you can use the proxy to make requests to the backend.
// 2. In the backend, you can use the proxy to make requests to other services.
// 3. In the backend, you can use the proxy to make requests to the frontend.
// 4. In the frontend, you can use the proxy to make requests to other services.

// where I should call the proxy? to make requests to the backend?
// You can call the proxy in the following ways:

// where should I call the proxy module
// 1. In the frontend, you can call the proxy in the src/setupProxy.js file.

// should I change the routes from  const response = await axios.post(
// `${BACKEND_URL}/api/users/register`,
// userData,
// { withCredentials: true }
// )
// to const response = await axios.post(
// `/api/users/register`,
// userData,
// { withCredentials: true }
// )
// ??
