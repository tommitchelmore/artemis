FROM node
RUN mkdir -p /usr/src/artemis
WORKDIR /usr/src/artemis
COPY package.json /usr/src/artemis
COPY ./dist /usr/src/artemis/dist
COPY .env /usr/src/artemis
COPY tsconfig.json /usr/src/artemis
RUN npm install
CMD ["node", "dist/index.js"]