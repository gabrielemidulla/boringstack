FROM node:22-alpine AS deps

WORKDIR /app

RUN apk add --no-cache curl bash libstdc++ \
  && curl -fsSL https://vite.plus | bash

ENV PATH="/root/.vite-plus/bin:${PATH}"

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml vite.config.ts ./
COPY apps/web/package.json apps/web/package.json
COPY packages/i18n/package.json packages/i18n/package.json
COPY packages/sdk/package.json packages/sdk/package.json

RUN vp install --frozen-lockfile

FROM deps AS build

COPY tsconfig.json tsconfig.base.json ./
COPY apps/web apps/web
COPY packages/i18n packages/i18n
COPY packages/sdk packages/sdk

RUN vp run --filter @boringstack/web build

FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/build /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
