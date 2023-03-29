FROM node:18-alpine AS build-step

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY ./src ./src
COPY ./public ./public
RUN yarn build

FROM nginx:stable-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step ./app/build /usr/share/nginx/html