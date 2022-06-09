FROM node:18.1.0

RUN mkdir -p /usr/src/strv

COPY src /usr/src/strv/src
COPY package.json /usr/src/strv

WORKDIR /usr/src/strv

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]