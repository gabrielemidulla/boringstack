FROM node:22-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/i18n/package.json packages/i18n/package.json
COPY packages/sdk/package.json packages/sdk/package.json

RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY tsconfig.json tsconfig.base.json ./
COPY apps/web apps/web
COPY packages/i18n packages/i18n
COPY packages/sdk packages/sdk

RUN pnpm --filter @boringstack/web build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/i18n/node_modules ./packages/i18n/node_modules
COPY --from=deps /app/packages/sdk/node_modules ./packages/sdk/node_modules
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY --from=build /app/packages/i18n/dist ./packages/i18n/dist
COPY --from=build /app/packages/sdk/dist ./packages/sdk/dist
COPY --from=build /app/apps/web/package.json ./apps/web/package.json
COPY --from=build /app/packages/i18n/package.json ./packages/i18n/package.json
COPY --from=build /app/packages/sdk/package.json ./packages/sdk/package.json

EXPOSE 3001

CMD ["node", "apps/web/dist/index.js"]
