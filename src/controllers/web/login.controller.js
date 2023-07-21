export function login(req, res, next) {
    res.render('login', {
        cssName: 'login',
        pageTitle: 'Iniciar Sesión'
    });
}