# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all deps (including dev)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build project
RUN pnpm build



# ---- Production Stage ----
FROM node:18-alpine AS production
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built files
COPY --from=build /app/dist ./dist

# Copy package.json + lockfile
COPY package.json pnpm-lock.yaml ./

# Copy *all* node_modules from build (so vite exists)
COPY --from=build /app/node_modules ./node_modules

# Expose preview port
EXPOSE 3000

# Run Vite preview
CMD ["pnpm", "preview", "--port", "3000", "--host"]
