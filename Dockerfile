FROM node:alpine

WORKDIR /usr/app-mlmh

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","start"]
