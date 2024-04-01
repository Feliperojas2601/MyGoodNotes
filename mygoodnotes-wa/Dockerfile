FROM node:18-alpine as build
WORKDIR /app/src
COPY mygoodnotes-wa/package*.json ./
RUN npm ci
COPY mygoodnotes-wa ./
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/mygoodnotes-wa ./
CMD node server/server.mjs
EXPOSE 4000