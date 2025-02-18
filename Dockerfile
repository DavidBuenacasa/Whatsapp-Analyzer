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
COPY package.json package-lock.json ./
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/
RUN npm ci --only=production

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/build ./build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["serve", "-s", "build", "-l", "3000"]
