{
  "name": "appbeseleksi",
  "version": "1.0.0",
  "keywords": [
    "express",
    "prisma",
    "graphql",
    "nexus",
    "typescript",
    "jwt"
  ],
  "author": "Mochamad Idris",
  "license": "MIT",
  "description": "Simple app for backend with express, prisma, graphql, nexus, typescript, jwt",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "nodemon dist/server.js",
    "generate": "npx zenstack generate && npx prisma db push",
    "migrate:fresh": "npx prisma migrate reset",
    "seed": "ts-node seeds/app.ts && ts-node seeds/roles.ts && ts-node seeds/permissions.ts",
    "seed:roles": "ts-node seeds/roles.ts",
    "seed:permissions": "ts-node seeds/permissions.ts",
    "seed:units": "ts-node seeds/units.ts",
    "seed:agama": "ts-node seeds/agama.ts",
    "seed:negara": "ts-node seeds/negara.ts"
  },
  "dependencies": {
    "@apollo/server": "^4.11.2",
    "@prisma/client": "^5.21.1",
    "@zenstackhq/runtime": "^2.7.2",
    "axios": "^1.7.7",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "graphql": "^16.9.0",
    "graphql-scalars": "^1.23.0",
    "jsonwebtoken": "^9.0.2",
    "nexus": "^1.3.0",
    "nexus-prisma": "^2.0.5",
    "nodemon": "^3.1.7"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.7.8",
    "prisma": "^5.21.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3",
    "zenstack": "^2.7.2"
  }
}