FROM node:15-alpine AS build

WORKDIR /app

ADD ./src /app/src
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock
ADD ./tsconfig.build.json /app/tsconfig.build.json

RUN yarn install
RUN yarn build

RUN cp -r package.json dist/
RUN cp yarn.lock dist/

FROM node:15-alpine AS web

WORKDIR /app
COPY --from=build /app/dist /app
RUN yarn install --only=prod

EXPOSE 3000

CMD [ "node", "app.js" ]
