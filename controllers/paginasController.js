import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
  // esta forma de arreglo y llamado por medio de promise.all
  // se usa cuando son consultas diferentes si depende una de otra
  // si se puede usar el metodo de await independiente por cada uno
  // const viaje = await Viaje.findAll({limit:3})
  // const testimoniales = await Testimonial.findAll({limit: 3})
  // solo si uno depende de otro se usa esta forma
  // de lo contrario es mejor y de mayor calidad usar el promise array all
  const promiseDB = [];

  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));
  try {
    const resultado = await Promise.all(promiseDB);
    // Consultar 3 viajes del modelo Viaje
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  } catch (e) {
    console.log(e);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  }); // solo el nombre de la vista porque
  // El framework de express escanea buscando la carpeta views y seleccionando la vista
  // que tiene el nombre similar en el render
  //   res.render("nosotros", {
  //     viajes,
  //   }); // asi se pasa una variable si se llama igual clave y valor solo se pone una en un objeto
};
const paginaViajes = async (req, res) => {
  // Consultar base de datos
  const viajes = await Viaje.findAll();
  res.render("viajes", {
    pagina: "Viajes",
    viajes,
  });
};
const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaDetalleViaje = async (req, res) => {
  // req es lo que estoy enviando al servidor
  // los paremetros son propiedades que tiene esos datos enviados
  // entre ellos los valores comodin de las rutas /:id%:value
  // Con el nombre que se puso en el url
  const { slug } = req.params;
  // try catch se usa cuando haces una consulta a una db para que
  // la aplicación no explote si es que falla
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Información viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
