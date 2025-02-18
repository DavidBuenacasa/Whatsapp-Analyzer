# Etapa de construcción
FROM node:lts AS build
WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Eliminar los archivos HTML por defecto de nginx
RUN rm -rf ./*

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/dist .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]
