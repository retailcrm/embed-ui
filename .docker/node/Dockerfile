FROM node:22

WORKDIR /project

RUN corepack enable && corepack prepare yarn@4.12.0 --activate \
  && test "$(yarn --version)" = "4.12.0" \
  && mkdir -p /home/node/.cache/node \
  && cp -a /root/.cache/node/corepack /home/node/.cache/node/corepack \
  && chown -R node:node /home/node/.cache
