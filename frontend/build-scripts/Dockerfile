FROM node:15-slim AS builder
#install nodejs dependencies
COPY package*.json ./

RUN yarn install

#Relase image
FROM node:15-alpine

LABEL multi.maintainer="abbaswattoo@gmail.com"\
    multi.owner="CandyCoin" \
    multi.service="CandyCoin frontend"

RUN set -x \
    # 
    && apk --no-cache update

WORKDIR /API

COPY --from=builder node_modules ./node_modules

# Copy source code to app folder
COPY . .

RUN yarn run build

EXPOSE 3000

CMD yarn run start
