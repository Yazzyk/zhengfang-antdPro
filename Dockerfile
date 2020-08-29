FROM node:14.4.0
EXPOSE 3031
WORKDIR /app/html
COPY ./dist /app/html/dist
COPY ./app.js /app/html
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install pm2 -g
RUN npm install express http-proxy-middleware
CMD ["pm2-docker", "app.js"]