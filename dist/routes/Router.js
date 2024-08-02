"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesRoutes_1 = __importDefault(require("./gamesRoutes"));
const router = (0, express_1.Router)();
router.use('/games', gamesRoutes_1.default);
exports.default = router;
