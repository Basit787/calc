# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build project
RUN pnpm build



# ---- Production Stage ----
FROM node:18-alpine AS production
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built app + needed files
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/dist ./dist

# Install only prod dependencies (if any)
RUN pnpm install --prod --frozen-lockfile

# Expose vite preview port
EXPOSE 3000

# Run Vite preview
CMD ["pnpm", "preview", "--port", "3000", "--host"]
