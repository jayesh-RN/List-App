FROM node:18.9.1-alpine3.15 AS build-stage 
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . . 
RUN npm run build

FROM nginx:alpine3.20-slim
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]