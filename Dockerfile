FROM node:14.4.0
WORKDIR /www/wwwroot/edu.css0209.cn/html
COPY ./ /www/wwwroot/edu.css0209.cn/html
RUN npm install -g pm2@latest
RUN pm2 start app.js