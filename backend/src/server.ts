import { app } from "./app.js";

app
  .listen({ port: 3333 })
  .then(() => {
    console.log("HTTP server running!");
  })
  .catch((e) => {
    console.log(e);
  });
