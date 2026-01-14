# --- ETAPA 1: Construcción (Build) ---
FROM node:lts-alpine AS builder
WORKDIR /app

# Instalación limpia de dependencias
COPY package*.json ./
RUN npm ci

# Copia de código y generación del bundle (dist)
COPY . .
RUN npm run build

# --- ETAPA 2: Producción (Servidor ligero) ---
FROM nginx:alpine AS production

# Copiamos solo los archivos estáticos compilados
# Nota: Si tu build genera la carpeta 'build' en lugar de 'dist', ajusta la ruta
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto estándar web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]