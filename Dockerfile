# Etapa 1: construir la aplicación
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración por defecto de nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]