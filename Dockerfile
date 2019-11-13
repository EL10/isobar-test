FROM node:8.3-alpine
EXPOSE 8080
RUN mkdir /isobar_test
WORKDIR /isobar_test
RUN cd /isobar_test
COPY ./package.json .
COPY . .
RUN npm install
CMD ["npm", "start"]