# --- ETAPA 1: Construcción del Frontend ---
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Compila el frontend (genera la carpeta /dist)
RUN npm run build

# --- ETAPA 2: Producción ---
FROM node:18-alpine AS production-stage
WORKDIR /app

# Solo instalamos dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiamos el servidor (Backend)
COPY server/ ./server/

# Copiamos el frontend compilado (Frontend)
# Asegúrate de que tu server.js sirva la carpeta 'dist'
COPY --from=build-stage /app/dist ./dist

# Exponemos el puerto que use tu server.js (ajusta si es necesario)
EXPOSE 3000

# Ejecutamos el servidor
CMD ["node", "server/server.js"]