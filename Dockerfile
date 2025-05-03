FROM node:22-alpine AS base

RUN apk add python3 build-base samurai meson

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Build stage
FROM base AS build
ARG NUXT_UI_PRO_LICENSE
ARG NUXT_STORAGE_FOLDER
ARG NUXT_DB_FILE_PATH
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/.output/ ./
COPY drizzle.config.ts ./
COPY ./drizzle /app/drizzle
EXPOSE 8080
CMD ["node", "/app/server/index.mjs"]