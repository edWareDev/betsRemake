import fs from 'fs'

export async function predicciones(req, res, next) {
    const data = JSON.parse(fs.readFileSync('./src/database/matchs.json', { encoding: 'utf8' }));
    let tournamentName = ''
    let actualTimestamp = +new Date
    for (let key in data) {
        if (key === 'updatedTime') {
            Number(actualTimestamp) - Number(data[key]) > 100 ? console.log('Problemas con la actualización') : console.log('Sin problemas en la actualización');;
        } else {
            tournamentName = key
        }
    }
    const rutaClasificatoriasSa = data[tournamentName]['Clasificatorias SA']
    const UbQuarterFinals = rutaClasificatoriasSa['matchsData']['Upper Brackets']["Quarterfinals"]
    const UbSemifinals = rutaClasificatoriasSa['matchsData']['Upper Brackets']["Semifinals"]
    const UbFinal = rutaClasificatoriasSa['matchsData']['Upper Brackets']["Final"]

    const allMatchs = [...UbQuarterFinals, ...UbSemifinals, ...UbFinal]
    console.log(allMatchs);

    const pastMatchs = []
    const liveMatchs = []
    const futureMatchs = []


    // console.log(UbQuarterFinals);
    // console.log(UbSemifinals);
    // console.log(UbFinal);
    res.render('predictionsPage', {
        cssName: "predictionsPage",
        pageTitle: 'Predicciones'
    })
}