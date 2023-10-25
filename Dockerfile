FROM node:18-alpine-3.18
USER node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
ENV PORT 8000
EXPOSE $PORT