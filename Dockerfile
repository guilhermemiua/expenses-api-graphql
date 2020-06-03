FROM node:14

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

EXPOSE 3333