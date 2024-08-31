FROM golang:1.16

EXPOSE 8080

WORKDIR /usr/src/app

COPY . .

RUN go test ./...

ENV REQUEST_ORIGIN=http://localhost:5000

RUN go build

RUN useradd -m appuser
RUN chown appuser .

# Reduce the size of the image
# RUN go test ./... && \
#     go build && \
#     useradd -m appuser && \
#     chown appuser .

USER appuser

CMD ["./server"]