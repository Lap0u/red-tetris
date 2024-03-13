FROM node:21-alpine3.17

WORKDIR /app

COPY package.json ./ 

RUN npm install

COPY . .

EXPOSE 3333
EXPOSE 3334

CMD ["node", "ace", "serve", "--watch"]