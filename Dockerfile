# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build



# ---- Production stage ----
FROM node:18-alpine AS production
WORKDIR /app

RUN npm install -g pnpm

# Copy built files
COPY --from=build /app/dist ./dist

# Install serve
RUN pnpm add serve

EXPOSE 3000

# Serve the built app
CMD ["pnpm", "serve", "-s", "dist", "-l", "3000"]
