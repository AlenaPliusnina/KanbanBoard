FROM node:alpine

RUN npm install -g vue-cli

WORKDIR '/app'

COPY ./package*.json ./

RUN npm install -g npm@7.6.0

COPY ./ ./

CMD [ "npm", "run", "dev"]
