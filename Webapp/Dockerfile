# Use LTS Node environment as build environment
FROM node:carbon AS builder

ARG NODE_OPTIONS
ARG RINKEBY_DAI_ADDRESS=0x4d87A619499b754CecB135671ED7Eb5F5071245A
ARG RINKEBY_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0x573D6899B7F22E737582dBfa4ca784CF284982A5
ARG GOERLI_DAI_ADDRESS=0xEA2137a627DaEfE32E19746D329cA196fccc0014
ARG GOERLI_CAPTURE_THE_BLOCK_CONTRACT_ADDRESS=0x07b82E4960382956992b3BDCCed7fd7c631068C7

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
