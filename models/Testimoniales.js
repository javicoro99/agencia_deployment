import Sequelize from "sequelize";
import db from "../config/db.js";
// esto llama al modelo dela base de datos ya creada
// se puede crear el modelo en el mismo codigo pero
// creo que la desventaja es que se borra toda la tabla cada
// que se crea aun no lo compruebo
// esto tambien define que datos se estaran llamando
// ante cualquier error siempre verificar la consola
// el table plus es para conectarse con la base de datos que esta activa
// y en ella poder hacer consultas y añadir o modificar información
// tambien sirve para poder crear nuebas bases de datos.
export const Testimonial = db.define("testimoniales", {
  nombre: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  mensaje: {
    type: Sequelize.STRING,
  },
});
