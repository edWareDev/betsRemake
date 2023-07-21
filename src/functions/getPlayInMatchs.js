import puppeteer from "puppeteer";

export async function getPlayInMatchs(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
        const playInMatchs = {};
        const matchBlocks = document.querySelectorAll('.brkts-matchlist');
        matchBlocks.forEach(block => {
            const blockTitle = block.querySelector('.brkts-matchlist-title').innerText.replace('\n[hide]', '');
            playInMatchs[blockTitle] = {};
            const matchsInfo = block.querySelectorAll('.brkts-match-info-popup');
            matchsInfo.forEach((match, i) => {
                const bo = match.querySelectorAll('.brkts-popup-body-game').length
                const teamsName = match.querySelectorAll('.name') || []
                const scoreTeam1 = match.querySelector('.brkts-popup-header-opponent-score-left')?.innerText || '0'
                const scoreTeam2 = match.querySelector('.brkts-popup-header-opponent-score-right')?.innerText || '0'
                const timerObject = match.querySelector('.timer-object') || 'Sin Datos';
                const status = timerObject?.getAttribute('data-finished') === 'finished' ? 'finished' : 'pending' || 'Sin Datos'
                const timestamp = timerObject?.getAttribute('data-timestamp') || 'Sin Datos'
                const date = timerObject?.querySelector('.timer-object-date')?.innerText || 'Sin Datos'
                const data = {
                    bo,
                    teamName1: teamsName[0]?.innerText || 'No Definido',
                    teamName2: teamsName[1]?.innerText || 'No Definido',
                    scoreTeam1,
                    scoreTeam2,
                    status,
                    timestamp,
                    date
                }
                playInMatchs[blockTitle][`match${i}`] = data;
            });
        });
        return playInMatchs
    });
    const data = {
        updatedTime: +new Date(),
        matchs: result,
    }
    await browser.close();
    return data;
}
