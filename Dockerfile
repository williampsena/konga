FROM node:20-alpine as base

USER root

ARG DB_ADAPTER=all

RUN apk upgrade --update \
    && apk add bash git ca-certificates python3 \
    && npm install -g bower

FROM base as pkgs

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY bower.json /app/bower.json

WORKDIR /app

COPY ./scripts/clean_packages.sh /app/clean_packages.sh

RUN bash /app/clean_packages.sh ${DB_ADAPTER}

RUN npm --unsafe-perm --omit=dev ci \
    && apk del git

FROM pkgs as apps

COPY . /app

RUN rm -rf /var/cache/apk/* \
        /app/.git \
        /app/screenshots \
        /app/test \
    && adduser -H -S -g "Konga service owner" -D -u 1200 -s /sbin/nologin konga \
    && mkdir /app/kongadata /app/.tmp \
    && chown -R 1200:1200 /app/views /app/kongadata /app/.tmp
    
EXPOSE 1337

VOLUME /app/kongadata

USER konga

ENTRYPOINT ["/app/start.sh"]
