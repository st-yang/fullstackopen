FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node --from=test-stage /usr/src/app .

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "dist"]