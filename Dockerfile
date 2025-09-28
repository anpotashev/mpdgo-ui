FROM nginx:1.29.1-alpine-slim

COPY ./dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY dockerdata/default.conf /etc/nginx/conf.d/default.conf
COPY dockerdata/upstream.conf.template /etc/nginx/templates/upstream.conf.template

EXPOSE 80