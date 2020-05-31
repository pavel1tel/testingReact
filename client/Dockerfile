FROM node:12 AS initial

FROM initial as builder
WORKDIR client/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM initial AS serve
COPY --from=builder client/build/ build/
RUN npm install -g serve 
EXPOSE 8080

CMD [ "serve", "-s", "build", "-l", "8080" ]
