# Usar Node.js como base -> imagen oficial de Node.js
FROM node:18-alpine


# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el codigo fuente
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Iniciar la aplicacion
CMD ["npm", "run", "dev"]