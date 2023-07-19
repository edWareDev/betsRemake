import express from 'express';
import { Server as SocketIOServer } from 'socket.io'
import { engine } from 'express-handlebars';
import fs from 'fs/promises'
import { PORT } from '../config/server.config.js';
import { conectarABD } from "../database/mongoose.js";
import { apiRouter } from '../routes/api.router.js';
import { viewsRouter } from '../routes/views.router.js';
import { getPlayInMatchs } from '../getData/getPlayInMatchs.js';
import { getGroupStageMatchs } from '../getData/getGroupStageMatchs.js';


const app = express();

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

const httpServer = app.listen(PORT, () => { console.log(`conectado en el puerto ${PORT}`) });
await conectarABD()
const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
  console.log(`Nuevo Cliente conectado! id: ${clientSocket.id}`);
  clientSocket.emit('mensajeDesdeServidor', { Conexión: 'Satisfactoria' });

  const matchs = await main();
  clientSocket.emit('firstConection', matchs)

  clientSocket.on('getData', async (data) => {
  })
})

app.use('/api', apiRouter)
app.use('/', viewsRouter)

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capturarDatos() {
  while (true) {
    const playInMatchs = await getPlayInMatchs('https://liquipedia.net/dota2/Riyadh_Masters/2023/Play-In#Matches')
    const groupStageMatchs = await getGroupStageMatchs('https://liquipedia.net/dota2/Riyadh_Masters/2023/Group_Stage#Matches')
    const datosObtenidos = {
      playInMatchs,
      groupStageMatchs
    }
    fs.writeFile('matchs.json', JSON.stringify(datosObtenidos, null, 2));
    await delay(15000); // Esperar 10 segundos antes de ejecutar nuevamente
  }
}

capturarDatos()