FROM node:16

EXPOSE 5000

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost:8080/

RUN npm run build

RUN npm install -g serve

RUN useradd -m appuser
RUN chown appuser .

# Reduce the size of the image
# RUN npm install && \
#     npm run build && \
#     npm install -g serve && \
#     rm -rf /tmp/* /var/tmp/* /usr/src/app/node_modules /usr/src/app/src && \
#     useradd -m appuser && \
#     chown appuser .

USER appuser

CMD ["serve", "-s", "-l", "5000", "build"]