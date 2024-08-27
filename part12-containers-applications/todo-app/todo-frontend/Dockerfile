FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm ci

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "dist"]