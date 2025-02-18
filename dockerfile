# Use an official Node.js runtime as the base image for the backend
FROM node:18 AS backend

# Set the working directory for the backend
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json for the backend
COPY ./backend/package*.json ./

# Install backend dependencies
RUN npm install --frozen-lockfile

# Copy backend source code
COPY ./backend /usr/src/app/backend

# Expose the backend port (example: 5000)
EXPOSE 5000