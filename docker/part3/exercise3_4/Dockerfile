FROM docker:27.2.0

WORKDIR /workdir

COPY ./builder.sh .

RUN chmod a+x /workdir/builder.sh

ENTRYPOINT ["/workdir/builder.sh"]
