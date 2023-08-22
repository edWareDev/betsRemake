import express from 'express';
import { PORT } from '../config/server.config.js';
import { engine } from 'express-handlebars';
import { apiRouter } from '../routes/api.router.js';
import { viewsRouter } from '../routes/views.router.js';
import { conectarABD } from "../database/mongoose.js";
import session from '../middlewares/session.js'
// import { getPlayInMatchs } from '../functions/getPlayInMatchs.js';
// import { getGroupStageMatchs } from '../functions/getGroupStageMatchs.js';
import { Server as SocketIOServer } from 'socket.io'
import cors from "cors";
import fs from 'fs/promises'

const app = express();
app.use(cors())
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

app.use(session)

app.use('/api', apiRouter)
app.use('/', viewsRouter)

await conectarABD()

const httpServer = app.listen(PORT, () => { console.log(`conectado en el puerto ${PORT}`) });


// const io = new SocketIOServer(httpServer)

// io.on('connection', async clientSocket => {
//   console.log(`Nuevo Cliente conectado! id: ${clientSocket.id}`);
//   clientSocket.emit('mensajeDesdeServidor', { Conexión: 'Satisfactoria' });
//   const matchs = await fs.readFile('./src/database/matchs.json', { encoding: 'utf8' });
//   clientSocket.emit('firstConection', matchs)
//   clientSocket.on('getData', async (data) => {
//   })
// })



// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function capturarDatos() {
//   while (true) {
//     const playInMatchs = await getPlayInMatchs('https://liquipedia.net/dota2/Riyadh_Masters/2023/Play-In#Matches')
//     const groupStageMatchs = await getGroupStageMatchs('https://liquipedia.net/dota2/Riyadh_Masters/2023/Group_Stage#Matches')
//     const datosObtenidos = {
//       playInMatchs,
//       groupStageMatchs
//     }
//     fs.writeFile('./src/database/matchs.json', JSON.stringify(datosObtenidos, null, 2));
//     await delay(15000); // Esperar 10 segundos antes de ejecutar nuevamente
//   }
// }

// capturarDatos()