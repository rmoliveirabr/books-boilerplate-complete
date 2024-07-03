#!/bin/sh

# Start the development server

rm -r ./dist/*
mkdir ./dist
cp -r ./prisma ./dist/prisma
cp ./.env ./dist
npm run start:dev