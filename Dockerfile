FROM node:20-alpine3.19 AS build


WORKDIR /usr/src
COPY --chown=node:node . /usr/src
COPY package*.json /usr/src/

#RUN npm cache clean
RUN npm install -g npm@10.9.0 && npm ci --only=Production && rm -f .npmrc

RUN npm i
RUN npm run build
RUN npm i --Production

FROM node:lts-alpine3.19

# Establecemos zona horaria
RUN mkdir -p /var/log/containers/
RUN apk add -U tzdata && chown -R node:node /var/log/containers/
ENV TZ=America/Mexico_City
RUN cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime

RUN apk add dumb-init
ENV NODE_ENV Production
USER node
WORKDIR /usr/src
COPY --chown=node:node . /usr/src
COPY --chown=node:node --from=build /usr/src/node_modules /usr/src/node_modules
COPY --chown=node:node --from=build /usr/src/build /usr/src/build
EXPOSE 3000
CMD ["dumb-init", "npm", "start"]