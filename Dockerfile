FROM node:14

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 8080

CMD npm start