import {Router} from 'express'
import { GamesController } from '../controllers/gamesController'

const gamesRouter = Router()

gamesRouter.get('/',GamesController.getGames)
gamesRouter.post('/',GamesController.createGame)
gamesRouter.delete('/:id',GamesController.deleteGame)



export default gamesRouter