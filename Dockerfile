FROM node:18.1.0

RUN mkdir -p /usr/src/strv

ENV DB_HOST=34.65.204.245 DB_PORT=5432 DB_USER=docker DB_PASSWORD=docker DB_NAME=docker

COPY src /usr/src/strv/src
COPY package.json /usr/src/strv
COPY package-lock.json /usr/src/strv
COPY tsconfig.json /usr/src/strv

WORKDIR /usr/src/strv

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]