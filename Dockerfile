FROM node:18-alpine AS builder

RUN npm install -g npm@latest

WORKDIR /app


COPY . .
COPY prisma ./

RUN npm exec prisma generate

COPY package.json /app/package.json
RUN rm -rf /app/package-lock.json
RUN cd /app && rm -rf /app/node_modules &&  npm install

RUN cd /app && rm -rf /app/dist &&  npm run build

EXPOSE 3005

CMD ["node", "dist/src/main.js"]
