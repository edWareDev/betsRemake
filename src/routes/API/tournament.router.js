import { Router } from 'express';
import fs from 'fs'

export const tournamentRouter = Router();

tournamentRouter.get('/', async (req, res, next) => {
    const file = fs.readFileSync('./src/database/matchs.json', { encoding: 'utf8' });
    res.status(200).json(JSON.parse(file));
});