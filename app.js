// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static(path.join(__dirname, './dist')));
app.use(
  '/api/**',
  createProxyMiddleware({
    target: '172.18.0.1:5000',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }),
);
app.use(
  '/cdn',
  createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net',
    changeOrigin: true,
    pathRewrite: { '^/cdn': '/gh/paleblueyk/cdn/img/edu_css0209_cn' },
  })
);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(3031);
