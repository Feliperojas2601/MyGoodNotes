FROM node:18-alpine
WORKDIR /usr/src/app
COPY mygoodnotes-ba/package*.json ./
RUN npm install
COPY mygoodnotes-ba .
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:prod"]
