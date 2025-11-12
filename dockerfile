FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy pre-built files (built on host, not in Docker)
COPY .next ./.next
COPY public ./public
COPY src ./src
COPY next.config.mjs ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
