// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
require("dotenv").config({ path: "variables.env" });

const app = express();
// Conectar la base de datos SQL
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));
// Definir puerto

//Habilitar pug
app.set("view engine", "pug");

// Nuestro propio middelware
app.use((req, res, next) => {
  const year = new Date();
  //request lo que estas enviando al servidor
  //response lo que el servidor te esta enviando a ti
  //next se usa para continuar y que la pila de ejecuación no se trabe un solo midalware
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viajes";
  next();
  // return next() es para llamar de manera forzosa a pasar de este midalware
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta publica
app.use(express.static("public"));

//Agregar router

app.use("/", router);

// app.get("/", (req, res) => {
//   // req- lo que enviamos : res - lo que empress nos responde
//   res.send("Hola Mundo"); // para contenido estatico
//   res.json({
//     id: "fd",
//   }); // para retornar un json
//   res.render(); // para devolver una vista renderizada del modelo MVC
// });

/* Puerto y host para la app */

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
