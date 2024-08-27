FROM node:20-alpine

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install --verbose
RUN npm run build

CMD node .output/server/index.mjs
