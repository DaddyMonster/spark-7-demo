#--- CREATING BASE
FROM node:12-alpine AS base
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/cache
COPY package.json .
RUN npx add-dependencies reflect-metadata @nestjs/core @nestjs/platform-express rxjs

#--- DEPENDENCIES

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

#--- SOME TEST HERE
###################

#--- DEPLOY
FROM base as deploy 
WORKDIR /app
COPY --from=dependencies /app/cache/node_modules ./node_modules
COPY . .
ENV NODE_ENV=$NODE_ENV
CMD ["node", "main.js"]
