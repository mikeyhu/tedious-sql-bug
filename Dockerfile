FROM node:10.15.0-alpine
WORKDIR /usr/src/app/
ADD package.json ./
RUN npm install
ADD . .
CMD sleep 10 && node src/index.js
