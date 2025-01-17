# Use the latest Node.js Alpine image
FROM node:current-alpine

# Install dependencies
RUN apk update -U
RUN apk add fuse python3
RUN sed -i 's/#user_allow_other/user_allow_other/' /etc/fuse.conf

# Make the directory
RUN mkdir /usr/local/app

# Set the working directory in the container
WORKDIR /usr/local/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV BTFS_DEST=/media/fuse
ENV BTFS_SRC=/torrents/fuse

# Command to run the application
CMD ["npm", "start"]