"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = require("../controllers/gamesController");
const gamesRouter = (0, express_1.Router)();
gamesRouter.get('/', gamesController_1.GamesController.getGames);
gamesRouter.post('/', gamesController_1.GamesController.createGame);
gamesRouter.delete('/', gamesController_1.GamesController.deleteGame);
exports.default = gamesRouter;
