FROM nginx:latest

WORKDIR /app

COPY dist/ /usr/share/nginx/html/dist
COPY index.html /usr/share/nginx/html
COPY videos/ /usr/share/nginx/html/videos

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]