FROM nginx:alpine

#COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY dist/frontEnd .


## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
#COPY /dist/frontEnd/ /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]