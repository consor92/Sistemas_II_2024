# Usa una imagen base de Node.js para construir la aplicación
FROM node:18-alpine AS build

# Establece el directorio de trabajo para el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación, incluyendo el archivo .env
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de nginx para servir la aplicación
FROM nginx:stable-alpine

# Copia los archivos construidos al directorio predeterminado de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para el contenedor
EXPOSE 4000

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]