import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/mongodb.config.js";

export async function conectarABD() {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`Base de Datos Conectada a la ruta ${MONGODB_CNX_STR}`);
}