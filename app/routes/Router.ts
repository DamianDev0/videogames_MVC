import {Router} from 'express'
import gamesRoutes from './gamesRoutes'


const router = Router()

router.use('/games', gamesRoutes)

export default router