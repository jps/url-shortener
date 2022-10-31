FROM node:18-alpine
WORKDIR /api
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile
CMD yarn dev