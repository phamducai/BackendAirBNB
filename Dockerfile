FROM node:18

WORKDIR /test

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
COPY . .

RUN npm run build

EXPOSE  8080

CMD ["npm","run","start:prod"]