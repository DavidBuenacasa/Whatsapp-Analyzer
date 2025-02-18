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

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "server"]
