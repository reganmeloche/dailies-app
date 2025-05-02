# Frontend: Build frontend code into /app/frontend/build/
FROM node:22-slim AS frontend

WORKDIR /app

COPY frontend/ ./frontend

COPY backend/src/classes ./backend/src/classes

WORKDIR /app/frontend

RUN npm install

RUN npm run build

# Backend: Build backend code into /app/dist/
FROM node:22-slim AS backend

WORKDIR /app

COPY backend/ ./

RUN npm install

RUN npm run build 


# Final: Copy backend files, then front-end
FROM node:22-slim AS final

WORKDIR /app

COPY --from=backend /app/dist ./dist
COPY --from=backend /app/package*.json ./
COPY --from=backend /app/node_modules ./node_modules

COPY --from=frontend /app/frontend/build ./dist/build

EXPOSE 3001

CMD ["node", "dist/index.js"]
