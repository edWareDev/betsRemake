import { Router } from "express";

export const viewsRouter = Router()

viewsRouter.get('/predicciones', async (req, res, next) => {
    // const matchs = await main();
    res.render('realTimeBets', {
        cssName: "realTimeStyles",
        pageTitle: 'BETS'
        // matchs
    })
})

viewsRouter.get('/', async (req, res, next) => {
    res.send('LOGIN')
})