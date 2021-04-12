#--- CREATING BASE

FROM node:12-alpine AS base
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/cache
COPY package.json ./
#MAY NEED BELOW LATER
RUN npx add-dependencies @emotion/react @emotion/styled

#--- DEPENDENCIES

FROM base AS dependencies
RUN yarn install

#--- SOME TEST HERE
###################

#--- DEPLOY
FROM base as deploy 
WORKDIR /app
COPY --from=dependencies /app/cache ./
COPY .next ./.next
COPY public ./public
COPY next.config.js ./next.config.js

CMD yarn next start -p $PORT

