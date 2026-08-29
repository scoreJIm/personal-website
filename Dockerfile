# Multi-stage build for the static portfolio site
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Cap Node heap so the build fits the t2.micro (1 GB) instance
ENV NODE_OPTIONS=--max-old-space-size=512
RUN npm run build

# Serve the built static files with nginx (plain HTTP; TLS is terminated by the proxy)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
