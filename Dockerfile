FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

COPY /tmp/data /app/data

EXPOSE 8080

CMD ["node", "app.js"]


