FROM node:16-alpine

# Create app directory & Copy app source
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install app dependencies & Build
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install && npm run build

EXPOSE 1337

CMD [ "npm", "start" ]