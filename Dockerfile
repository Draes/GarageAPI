FROM nikolaik/python-nodejs:python3.9-nodejs10-alpine

# Create app directory
RUN mkdir -p /usr/opt/garage-api
WORKDIR /usr/opt/garage-api

# Bundle app source
COPY src src
COPY .config .config
COPY package-lock.json .
COPY package.json .
COPY .babelrc .
COPY index.js .

RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
