# ---------------
# Frontend: Build frontend code into /app/frontend/build/
# ---------------
FROM node:22-slim AS frontend

# Only copy package.json for caching
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

# Then copy the rest of the code
COPY frontend/ ./

# Back to app folder to get the shared classes 
WORKDIR /app
COPY backend/src/classes ./backend/src/classes

# Back to frontend app to run the build
WORKDIR /app/frontend
RUN npm run build

# ---------------
# Backend: Build backend code into /app/dist/
# ---------------
FROM node:22-slim AS backend

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./

RUN npx prisma generate

RUN npm run build 

# ---------------
# Final: Copy backend files, then front-end
# ---------------
FROM node:22-slim AS final

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY --from=backend /app/dist ./dist
COPY --from=backend /app/package*.json ./
COPY --from=backend /app/node_modules ./node_modules

COPY --from=frontend /app/frontend/build ./dist/build

EXPOSE 3001

CMD ["node", "dist/index.js"]
