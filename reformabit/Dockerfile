FROM node:carbon

RUN addgroup -system app && adduser --system --ingroup app app

# Alternatively use ADD https:// (which will not be cached by Docker builder)
RUN apt-get update -qy \
    && apt-get install -qy curl ca-certificates --no-install-recommends \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.8.0/fwatchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apt-get -qy remove curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/app

# Wrapper/boot-strapper
WORKDIR /home/app
COPY *.json ./

# This ordering means the npm installation is cached for the outer function handler.
RUN npm i --production || :

# Copy outer function handler
COPY index.js ./

# Set correct permissions to use non root user
WORKDIR /home/app/

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chown app:app -R /home/app \
    && chmod 777 /tmp

USER app

ENV cgi_headers="true"
ENV fprocess="node index.js"

HEALTHCHECK --interval=1s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

