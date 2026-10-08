# Dockerfile - 955108 Software Deployment
# Part 4 Lab: Container Registry & Cloud Deployment

# Use Node.js 20 LTS as base image
FROM node:20-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package files first (Docker layer caching)
COPY package*.json /usr/src/app/

# Install production dependencies only
RUN npm ci --only=production

# Copy compiled dist and public assets
COPY dist/ /usr/src/app/dist/
COPY src/public/ /usr/src/app/dist/public/

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
