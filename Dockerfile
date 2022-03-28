# Seperating the Build Process into two Processes
FROM node:14.17 as builder

RUN apt-get update && apt-get install build-essential -y
COPY package*.json ./
RUN npm install 


# Second part of build process
FROM node:14.17

COPY . /app

# Create app directory
WORKDIR /app
COPY --from=builder node_modules node_modules
WORKDIR /app/app/utils/ethereum
RUN node compile
WORKDIR /app
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "run", "start:prod" ]
