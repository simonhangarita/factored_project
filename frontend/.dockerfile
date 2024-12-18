FROM NODE:18-slim
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app ./
EXPOSE 5173
CMD ["npm","start"]