import { Router } from 'express';
import { UsersManager } from '../../manager/user.manager.js';
import bcrypt from 'bcrypt';

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
    try {
        const datosUsuario = req.body;
        if (datosUsuario.username && datosUsuario.password) {
            const result = await userManager.findUserByUsername(datosUsuario.username)
            if (result === null) {
                res.status(401).json({ error: 'Credenciales incorrectas', result: 'error' })
            } else {
                const isPasswordMatch = await bcrypt.compare(datosUsuario.password, result.password);
                if (isPasswordMatch === true) {
                    req.session.user = {
                        username: datosUsuario.username,
                    }
                    res.status(200).json({ message: 'Autenticación exitosa', result: 'success' })
                } else {
                    res.status(401).json({ error: 'Credenciales incorrectas', result: 'error' })
                }
            }
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas', result: 'error' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message, result: 'success' });
    }
    // const result = await userManager.findUserByUsername()
})

usersRouter.post('/addbet', async (req, res, next) => {
    const datosUsuario = req.body;
    try {
        userManager.getAllUsersPredictions();
        const result = await userManager.addBetToUser(datosUsuario)
        res.status(200).json(result)
    } catch (error) {
        res.json({ error: error.message });
    }
})