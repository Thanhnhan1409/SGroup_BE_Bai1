# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /src/app

# Install necessary depedencies
RUN apk add git

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

# Install the application dependencies
RUN yarn install

# Copy the application source code to the container
COPY . .

# Expose the port on which the application will run (assuming it's 3000)
EXPOSE 3308


# Define the command to start the application
CMD ["yarn", "start"]