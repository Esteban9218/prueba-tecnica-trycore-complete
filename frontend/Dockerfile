# Etapa 1: Construcción de la aplicación Angular
FROM node:20-alpine AS build

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias sin guardar archivos temporales
RUN npm ci

# Copiar el código del proyecto al contenedor
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build -- --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:latest

# Copiar archivos generados en la etapa de construcción al servidor Nginx
#COPY --from=build /app/dist/task-manager-e /usr/share/nginx/html
COPY --from=build /app/dist/task-manager-e/browser /usr/share/nginx/html


# Exponer el puerto en el que correrá la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]