# Use a lightweight Node.js Alpine image as base
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Expose the backend port (5000 in this case)
EXPOSE 5000

# Command to start the application
CMD ["npm", "run", "start"]