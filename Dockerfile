FROM node:23-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build


FROM node:23-alpine AS runner

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile --omit=dev
COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main.js"]
