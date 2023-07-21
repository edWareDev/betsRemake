import puppeteer from "puppeteer";

export async function getMatchsData(url, tournamentName) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate((tournamentNameParam) => {
        const matchsData = {};
        const matchBlocks = document.querySelectorAll('.brkts-matchlist');
        matchBlocks.forEach(block => {
            const blockTitle = block.querySelector('.brkts-matchlist-title').innerText.replace('\n[hide]', '');
            matchsData[blockTitle] = {};
            const matchData = block.querySelectorAll('.brkts-match-info-popup');
            matchData.forEach((match, i) => {
                const bo = match.querySelectorAll('.brkts-popup-body-game')
                const teamsName = match.querySelectorAll('.name') || []
                const scoreTeam1 = match.querySelector('.brkts-popup-header-opponent-score-left')?.innerText || '0';
                const scoreTeam2 = match.querySelector('.brkts-popup-header-opponent-score-right')?.innerText || '0';
                const timerObject = match.querySelector('.timer-object') || 'Sin Datos';
                const status = timerObject?.getAttribute('data-finished') === 'finished' ? 'finished' : 'pending' || 'Sin Datos';
                const timestamp = timerObject?.getAttribute('data-timestamp') || 'Sin Datos';
                const date = timerObject?.querySelector('.timer-object-date')?.innerText || 'Sin Datos';
                const remainingTime = timerObject?.querySelector('.timer-object-countdown-time').innerText || status;
                const games = {}
                const id = `${tournamentNameParam}-${bo.length}-${teamsName[0].innerText}-${teamsName[1].innerText}`.replaceAll(' ', '')
                for (let i = 1; i <= bo.length; i++) {
                    const game = {}
                    game.picks = {}
                    bo[i - 1].querySelectorAll('.brkts-popup-body-element-thumbs').forEach((team, i) => {
                        const allPicks = []
                        const teamPicks = team.querySelectorAll('a')
                        teamPicks.forEach((pick) => {
                            allPicks.push(pick.getAttribute('title'))
                        })
                        game['picks'][`team${i}`] = allPicks
                    })
                    game.winner = ''
                    game.duration = bo[i - 1].querySelector('.brkts-popup-body-element-vertical-centered i abbr').getAttribute('title') === 'Match Length' ? bo[i - 1].querySelector('.brkts-popup-body-element-vertical-centered i abbr').innerText : ''
                    bo[i - 1].querySelectorAll('.brkts-popup-spaced img').forEach((item, i) => {
                        if (item.getAttribute('src') === '/commons/images/6/66/GreenCheck.png') {
                            game.winner = `team${i + 1}`
                        }

                    })
                    games[`game${i}`] = game
                }
                const data = {
                    id,
                    bo: bo.length,
                    remainingTime,
                    teamName1: teamsName[0]?.innerText || 'No Definido',
                    teamName2: teamsName[1]?.innerText || 'No Definido',
                    scoreTeam1,
                    scoreTeam2,
                    status,
                    timestamp,
                    date,
                    games
                };
                matchsData[blockTitle][i] = data;
            });
        });
        return matchsData;
    }, tournamentName);
    const data = {
        updatedTime: +new Date(),
        matchsData: result,
    };
    await browser.close();
    return data;
}
