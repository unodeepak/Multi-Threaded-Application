
# FROM node:latest
FROM node:16.20.2


WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]