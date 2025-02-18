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
FROM node:lts AS production
WORKDIR /app

# Copiar archivos de construcción desde la etapa de construcción
COPY --from=build /app/dist ./dist

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "server"]
