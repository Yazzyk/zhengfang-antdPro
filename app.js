// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('http-proxy-middleware');

const app = express();
app.use(express.static(path.join(__dirname, './dist')));
app.use(
  '/api',
  proxy({
    target: 'https://backstage.edu.css0209.cn/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }),
);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(3031);
