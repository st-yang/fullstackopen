FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN apt update && apt install -y curl

COPY script.sh .

RUN chmod +x script.sh

ENTRYPOINT [ "./script.sh" ]