"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_ts_1 = require("./routes.ts");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)((req, res) => {
    (0, routes_ts_1.routes)(req, res);
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
