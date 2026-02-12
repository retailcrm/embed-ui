FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl tar git \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "https://github.com/nektos/act/releases/latest/download/act_Linux_x86_64.tar.gz" \
    | tar -xz -C /usr/local/bin act \
    && chmod +x /usr/local/bin/act

ENTRYPOINT ["act"]
