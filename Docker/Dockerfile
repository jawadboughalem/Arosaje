# Etape 1 : Utiliser l'image officielle de Node.js comme image de base
FROM node:14

# Etape 2 : ce qui Défini le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Etape 3 : Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Etape 4 : Installer les dépendances de l'application
RUN npm install

# Etape 5 : Copier tout le reste du code de l'application dans le conteneur
COPY src/App.js ./


# Étape 6 : Exposer le port sur lequel l'application tournera
EXPOSE 3000

# Étape 7 : Configurer les variables d'environnement directement dans le Dockerfile
#ENV DB_SERVER=localhost \
  #  DB_USER=SA \
   # DB_PASSWORD= \
    #DB_NAME=Arosaje \
   # DB_PORT=1433

# Étape 8 : Lancer l'application
CMD ["node", "App.js"]