#!/bin/sh
npx prisma migrate dev --name init
npx prisma generate
npm run start
