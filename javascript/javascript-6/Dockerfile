FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY service ./service/
COPY graphql ./graphql/
COPY index.js ./

RUN yarn add graphql-yoga
RUN npm install

CMD ["node", "index.js"]
