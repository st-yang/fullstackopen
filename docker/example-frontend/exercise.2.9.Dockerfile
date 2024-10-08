FROM node:16

EXPOSE 5000

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost/api

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "-l", "5000", "build"]