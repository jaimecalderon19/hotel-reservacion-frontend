# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Define la variable de entorno para ejecutar en modo producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD [ "node", ".output/server/index.mjs" ]