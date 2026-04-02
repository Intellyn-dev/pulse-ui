FROM node:20-alpine AS bff-builder
WORKDIR /app/bff
COPY bff/package*.json ./
RUN npm ci
COPY bff/ .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=bff-builder /app/bff/dist ./dist
COPY --from=bff-builder /app/bff/node_modules ./node_modules
COPY --from=bff-builder /app/bff/package.json .
EXPOSE 4000
CMD ["node", "dist/index.js"]
