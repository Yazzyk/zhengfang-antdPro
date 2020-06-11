FROM node:14.4.0
EXPOSE 3031
WORKDIR /www/wwwroot/edu.css0209.cn/html
COPY ./ /www/wwwroot/edu.css0209.cn/html
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install pm2 -g
RUN npm install
RUN pm2-docker start app.js