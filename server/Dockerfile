FROM node:18
LABEL authors="arkjuniork"

# Set workdir
WORKDIR /usr/src/app

# Copy package.json & package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 8081
EXPOSE 8081

# Entrypoint to run the server
ENTRYPOINT ["node", "src/index.js"]