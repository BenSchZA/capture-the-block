# Use LTS Node environment as build environment
FROM node:carbon AS builder

ARG NODE_OPTIONS

# Initialize working directory
RUN mkdir -p /app/Webapp
RUN mkdir -p /app/Blockchain/build
RUN mkdir /temp

ADD ./Webapp /app/Webapp
ADD ./Blockchain /temp

WORKDIR /temp
RUN yarn
RUN yarn build
RUN cp -r /temp/build/. /app/Blockchain/build
RUN rm -rf /temp

WORKDIR /app/Webapp

# Install necessary dependancies
RUN yarn

# Configure deployment environment
#ENV NODE_ENV=development
#ENV NODE_ENV=production

# Build application
RUN yarn build

# Use Nginx server to serve 'build' directory
FROM nginx:alpine

COPY --from=builder /app/Webapp/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/Webapp/build/ .

EXPOSE 80
