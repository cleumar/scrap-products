FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig-build.json ./
COPY src ./src
RUN yarn install
RUN yarn build

FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
RUN yarn install --only=production
COPY --from=0 /usr/dist /usr/dist
CMD [ "node", "dist/src/main/index.js" ]
EXPOSE 3000