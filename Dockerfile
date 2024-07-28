# Stage 1: Build the application
FROM node:alpine as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npx webpack

FROM nginx:latest


COPY dist/ /usr/share/nginx/html/dist
COPY index.html /usr/share/nginx/html
COPY videos/ /usr/share/nginx/html/videos

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]