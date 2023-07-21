import { Router } from "express";
import { autenticacion, isAutenticated } from "../middlewares/autenticacion.js";
import { login } from "../controllers/web/login.controller.js";
import { predicciones } from "../controllers/web/predicciones.controller.js";
import { register } from "../controllers/web/register.controller.js";

export const viewsRouter = Router()

viewsRouter.get('/', isAutenticated, login)
viewsRouter.get('/register', isAutenticated, register)
viewsRouter.get('/predicciones', autenticacion, predicciones)