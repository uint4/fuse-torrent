FROM node:current-alpine

RUN apk update -U \
    && apk add --no-cache --virtual .build-deps git \
    && apk add fuse \
    && git clone https://github.com/uint4/fuse-torrent \
    && cd fuse-torrent
    && npm install
    && node index.js