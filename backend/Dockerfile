# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package.json  ./

# Reinstall dependencies inside the container
RUN npm ci --force

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
