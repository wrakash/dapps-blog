###################
# BUILD STAGE
###################

FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

###################
# PRODUCTION STAGE
###################

FROM node:alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

# Copy only production dependencies and built files
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV production

USER node

CMD [ "node", "dist/main.js" ]
