# Stage 1: Build the application
FROM node:latest AS build-stage

# Install pnpm
RUN npm install -g pnpm
RUN pnpm config set registry http://registry.npmjs.org

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY InfoCompanies-Front/package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY InfoCompanies-Front .

# Build the application
RUN pnpm run build

# Stage 2: Serve the application from Nginx
FROM nginx:1.26.2-alpine

ARG CONFIG_PATH

COPY --from=build-stage /app/dist /usr/share/nginx/html/ui/