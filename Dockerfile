# Stage 1: Build the application
FROM node:16-alpine as build

WORKDIR /app

# Copy pakage.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npx webpack

# Stage 2: Serve the application with Nginx
FROM nginx:alpine


COPY --from=build /app/dist/ /usr/share/nginx/html/dist
COPY --from=build /app/index.html /usr/share/nginx/html
COPY --from=build /app/videos/ /usr/share/nginx/html/videos

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD [ "nginx", "-g", "daemon off;" ]