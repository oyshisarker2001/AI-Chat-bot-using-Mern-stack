# Use an official Node.js image as a base
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend React application for production
RUN npm run build

# Use Nginx to serve the production build
FROM nginx:alpine

# Copy the build files from the previous step to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Run Nginx in the background
CMD ["nginx", "-g", "daemon off;"]
