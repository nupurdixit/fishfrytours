#!/bin/sh
git pull origin main
npm install
npm run-script build
cd fishfrytoursapi
npm install
sudo systemctl restart nginx
sudo pm2 restart all