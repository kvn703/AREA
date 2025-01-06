FROM node:alpine

WORKDIR /home/FrontWeb

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
