FROM node:10.10.0-alpine
ARG configuration

# Create app directory
RUN mkdir -p /usr/opt/garage-api
WORKDIR /usr/opt/garage-api

# Bundle app source
COPY src src
# COPY .config .config
COPY package-lock.json .
COPY package.json .
COPY .babelrc .
COPY index.js .

RUN npm install --production

EXPOSE 3000
CMD ["node", "index.js"]
