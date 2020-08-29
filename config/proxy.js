/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/cdn/': {
      target: 'https://cdn.jsdelivr.net',
      changeOrigin: true,
      pathRewrite: {
        '^/cdn': '/gh/paleblueyk/cdn/img/edu_css0209_cn',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://backstage.edu.css0209.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      '/cdn/': {
        target: 'https://cdn.jsdelivr.net',
        changeOrigin: true,
        pathRewrite: {
          '^/cdn': '/gh/paleblueyk/cdn',
        },
      },
    },
  },
  pre: {
    '/api/': {
      target: 'https://backstage.edu.css0209.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      '/cdn/': {
        target: 'https://cdn.jsdelivr.net',
        changeOrigin: true,
        pathRewrite: {
          '^/cdn': '/gh/paleblueyk/cdn',
        },
      },
    },
  },
};
