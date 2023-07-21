export function register(req, res, next) {
    res.render('register', {
        cssName: 'register',
        pageTitle: 'Registrarse'
    });
}