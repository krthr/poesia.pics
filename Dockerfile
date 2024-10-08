FROM node:22-alpine AS base

RUN apk add python3 build-base samurai meson \
  build-base cfitsio-dev cgif-dev expat-dev fftw-dev giflib-dev \
  glib-dev gobject-introspection-dev imagemagick-dev lcms2-dev \ 
  libexif-dev libheif-dev libimagequant-dev libjpeg-turbo-dev \
  libpng-dev librsvg-dev libwebp-dev meson openexr-dev openjpeg-dev \ 
  orc-dev pango-dev poppler-dev libspng-dev tiff-dev zlib-dev libjxl-dev \
  --no-cache

RUN wget https://github.com/libvips/libvips/releases/download/v8.15.3/vips-8.15.3.tar.xz \
  && tar xf vips-8.15.3.tar.xz \
  && cd vips-8.15.3 \
  && meson setup build \
  && cd build && meson compile && meson test && meson install

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --foreground-scripts --build-from-source --os=linux --arch=arm64 --libc=musl

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev --foreground-scripts --build-from-source --os=linux --arch=arm64 --libc=musl

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]