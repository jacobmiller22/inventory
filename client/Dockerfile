FROM node:17-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN mkdir /usr/src/app/node_modules/.cache && chmod -R 777 /usr/src/app/node_modules/.cache

USER node

CMD ["npm", "start"]

