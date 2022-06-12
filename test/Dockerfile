FROM node:18.1.0

RUN mkdir -p /usr/src/strv/test

COPY . /usr/src/strv/test

WORKDIR /usr/src/strv/test

RUN npm install

CMD ["npm", "run", "test:e2e"]