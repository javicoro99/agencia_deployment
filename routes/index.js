import express from "express";
import {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
} from "../controllers/paginasController.js";

import { guardarTestimonial } from "../controllers/testimonialController.js";
//En este modo sin react creat app o webpack se tiene que poner si o si el .js al final de los archivos
// de js
const router = express.Router();

router.get("/", paginaInicio);
router.get("/nosotros", paginaNosotros);
router.get("/viajes", paginaViajes);
router.get("/viajes/:slug", paginaDetalleViaje);

router.get("/testimoniales", paginaTestimoniales);
router.post("/testimoniales", guardarTestimonial);
export default router;
