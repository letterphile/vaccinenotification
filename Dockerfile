FROM node:lts

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /vaccinenotification 

COPY package*.json ./

RUN npm install

COPY . .



CMD [ "node", "index.js" ]