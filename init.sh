#!/bin/bash

# Lancer Docker Compose
docker compose -f "docker-compose-setup.yml" up -d

# Exécuter la commande Certbot pour obtenir les certificats
docker compose -f "docker-compose-setup.yml" run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d app.com -d www.app.com

# Modifier les permissions des fichiers de certificats
sudo chmod -R 777 ./certbot/conf/live/
sudo chmod -R 777 ./certbot/conf/archive/

cp -r ./certbot/conf/archive/* ./certbot/conf/live/
mv ./certbot/conf/archive/app.com/cert1.pem ./certbot/conf/live/app.com/cert.pem
mv ./certbot/conf/archive/app.com/chain1.pem ./certbot/conf/live/app.com/chain.pem
mv ./certbot/conf/archive/app.com/fullchain1.pem ./certbot/conf/live/app.com/fullchain.pem
mv ./certbot/conf/archive/app.com/privkey1.pem ./certbot/conf/live/app.com/privkey.pem

# Convertir les certificats en format PKCS12
# openssl pkcs12 -export -out server.p12 -inkey ./certbot/conf/live/app.com/privkey.pem -in ./certbot/conf/live/app.com/fullchain.pem -certfile ./certbot/conf/live/app.com/chain.pem

# Arrêter Docker Compose
docker compose -f "docker-compose-setup.yml" down
