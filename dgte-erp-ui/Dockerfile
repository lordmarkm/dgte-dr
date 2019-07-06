FROM nginx:alpine

COPY los-ui-nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/los-ui .


EXPOSE 80
