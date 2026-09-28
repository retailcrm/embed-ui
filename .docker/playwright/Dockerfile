FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /project

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV COREPACK_HOME=/opt/corepack
ENV PATH=/project/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

RUN mkdir -p "$COREPACK_HOME" \
  && corepack enable \
  && corepack prepare yarn@4.12.0 --activate \
  && yarn --version \
  && chmod -R a+rwX "$COREPACK_HOME"
