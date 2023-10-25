FROM node:18-alpine3.17
USER node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
ENV PORT 5001
EXPOSE $PORT