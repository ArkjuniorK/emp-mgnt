## Employee Management App

This project was created using `client-server` architecture which seperated the client and server.
Often those two even lived in different repository, but since this project just for test purpose
then it's okay to keep both. Here the stack used to build this project:

- Frontend/Client
  - Next.js
  - Bootstrap

- Backend/Server
  - Express.js
  - Sequalize

### Running the App
Running the entire app could be done using these steps:
1. First, run the database service using `docker-compose` with command `docker compose up -d` make
   sure to execute the command at the root of project.
2. Start then server api with command `node server/src/index.js`.
3. Then finally run the client app, go to client directory and type command `npm run dev`. It should
   automatically start the client at `http://localhost:3000`.