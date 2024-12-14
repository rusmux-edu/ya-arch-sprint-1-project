ARG APP=auth

FROM node:23-slim AS base

ENV PNPM_HOME="/pnpm"

ARG APP
WORKDIR /frontend/mfe/$APP

ARG PLUGIN_PATH="eslint-plugin-local/mesto-eslint-plugin-local-1.0.0.tgz"
COPY --from=frontend $PLUGIN_PATH /frontend/$PLUGIN_PATH
ARG SHARED_PATH="shared/mesto-shared-1.0.0.tgz"
COPY --from=frontend $SHARED_PATH /frontend/$SHARED_PATH
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    corepack enable \
    && pnpm config set auto-install-peers false \
    && pnpm install --frozen-lockfile

COPY . .

FROM base AS dev

ENV NODE_ENV=development

CMD [ "pnpm", "dev" ]

FROM base AS build

ENV NODE_ENV=production

RUN pnpm build

FROM nginxinc/nginx-unprivileged:alpine-slim AS prod

ARG APP
COPY --from=build /frontend/mfe/$APP/dist /usr/share/nginx/html
COPY configs/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
