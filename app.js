// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static(path.join(__dirname, './dist')));
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://backstage.edu.css0209.cn/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }),
);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(3031);
