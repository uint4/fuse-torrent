# Use the latest Node.js Alpine image
FROM node:alpine-latest

# Set the working directory in the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV BTFS_DEST=/media
ENV BTFS_SRC=/torrents

# Install fuse
RUN apk update -U
RUN apk-add fuse

# Command to run the application
CMD ["npm", "start"]