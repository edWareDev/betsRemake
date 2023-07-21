export function predicciones(req, res, next) {
    res.render('realTimeBets', {
        cssName: "realTimeStyles",
        pageTitle: 'BETS'
    })
}