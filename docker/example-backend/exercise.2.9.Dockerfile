FROM golang:1.16

EXPOSE 8080

WORKDIR /usr/src/app

COPY . .

RUN go test ./...

ENV REQUEST_ORIGIN=http://localhost

RUN go build

CMD ["./server"]