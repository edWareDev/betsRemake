import { usersManager } from "../../dao/mongoose.user.manager.js";

export async function postRegisterUsersController(req, res, next) {
    const datosUsuario = req.body;
    console.log(datosUsuario);
    try {
        const resultado = await usersManager.addUser(datosUsuario);
        console.log(resultado);
        res.status(201).json(resultado);
    } catch (error) {
        res.json({ error: error.message });
    }
}
export async function postLoginUsersController(req, res, next) {
    const datosUsuario = req.body;
    try {
        const resultado = await usersManager.loginUser(datosUsuario);
        if (resultado) {
            req.session.user = {
                email: datosUsuario.email,
            }
            res.status(201).json(resultado);
        } else {
            res.status(401).json({ result: 'Error' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
}