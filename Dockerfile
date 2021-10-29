FROM node:16-alpine3.11

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
