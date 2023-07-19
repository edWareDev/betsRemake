import { Router } from 'express';
import { UsersManager } from '../../manager/user.manager.js';

const userManager = new UsersManager()

export const usersRouter = Router();

usersRouter.post('/register', async (req, res, next) => {
    const datosUsuario = req.body;
    try {
        const result = await userManager.addUser(datosUsuario)
        res.status(200).json(result)
    } catch (error) {
        res.json({ error: error.message });
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const datosUsuario = req.body;
})

usersRouter.post('/addbet', async (req, res, next) => {
    const datosUsuario = req.body;
    try {
        // username, tournamentId, matchId, predValues
        userManager.getAllUsersPredictions();
        const result = await userManager.addBetToUser(datosUsuario)
        res.status(200).json(result)
    } catch (error) {
        res.json({ error: error.message });
    }
})