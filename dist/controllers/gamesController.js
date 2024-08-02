"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesController = void 0;
const db_1 = __importDefault(require("../config/db"));
const gamesModel_1 = require("../data-access/gamesModel");
class GamesController {
    static getGames(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameRepository = new gamesModel_1.GameRepository(db_1.default);
                const games = yield gameRepository.All();
                res.status(200).json({
                    status: 200,
                    data: games,
                });
            }
            catch (error) {
                throw new Error("Cannot get games");
            }
        });
    }
    static createGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGame = req.body;
            try {
                const [result] = yield db_1.default.query("INSERT INTO games SET ?", [newGame]);
                res.status(201).json({
                    status: 201,
                    message: "Game created successfully",
                    data: Object.assign({ id: result.insertId }, newGame),
                });
            }
            catch (error) {
                res.status(500).send("Server error");
                throw new Error("Cannot create game");
            }
        });
    }
    static deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const gameRepository = new gamesModel_1.GameRepository(db_1.default);
                const success = yield gameRepository.Delete(id);
                if (!success) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                if (!success) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                res.status(200).json({
                    status: 200,
                    message: "Game deleted successfully",
                });
            }
            catch (error) {
                res.status(500).send("Server error");
                console.error("Error deleting game:", error);
            }
        });
    }
}
exports.GamesController = GamesController;
