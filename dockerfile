FROM node:18

RUN npm install -g nodemon

# Set directory project in docker
WORKDIR /app

# Copy file from local directory to WORKDIR
COPY package.json .
COPY . .

RUN npm install

# Expose app PORT to HOST OS
EXPOSE 3600

# Store node _modules
VOLUME ["/app/node_modules"]

# Running app command
CMD ["npm","run","dev"]
