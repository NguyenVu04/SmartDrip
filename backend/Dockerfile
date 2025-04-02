# # Use the official Node.js image from the Docker Hub
# FROM node:16

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the NestJS app
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 3000

# # Command to run the application
# CMD ["npm", "run", "start:prod"]

FROM node:18 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist

# Sao chép file .env vào container
COPY .env .
CMD npm run start:prod