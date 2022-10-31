FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile
CMD yarn dev