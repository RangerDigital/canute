FROM node:14.15.5-alpine3.10

COPY . .
RUN npm install --production

RUN npm install pm2 -g
RUN apk --no-cache add curl

# Healthcheck
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000/health || exit 1 

EXPOSE 3000
CMD ["pm2-runtime", "start.js"]
