FROM node:22-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/api/package.json packages/api/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/i18n/package.json packages/i18n/package.json

RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY tsconfig.json tsconfig.base.json ./
COPY apps/api apps/api
COPY packages packages

RUN pnpm --filter @boringstack/api-app build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages/api/node_modules ./packages/api/node_modules
COPY --from=deps /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=deps /app/packages/i18n/node_modules ./packages/i18n/node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/api/dist ./packages/api/dist
COPY --from=build /app/packages/db/dist ./packages/db/dist
COPY --from=build /app/packages/i18n/dist ./packages/i18n/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/packages/api/package.json ./packages/api/package.json
COPY --from=build /app/packages/db/package.json ./packages/db/package.json
COPY --from=build /app/packages/i18n/package.json ./packages/i18n/package.json

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]
