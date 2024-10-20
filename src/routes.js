"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controllers_1 = require("./controllers");
const routes = (req, res) => {
    var _a, _b, _c;
    if (req.method === 'GET' && req.url === '/api/users') {
        (0, controllers_1.getUsers)(req, res);
    }
    else if (req.method === 'GET' && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/users/'))) {
        (0, controllers_1.getUserById)(req, res);
    }
    else if (req.method === 'POST' && req.url === '/api/users') {
        (0, controllers_1.createUser)(req, res);
    }
    else if (req.method === 'PUT' && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/api/users/'))) {
        (0, controllers_1.updateUser)(req, res);
    }
    else if (req.method === 'DELETE' && ((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/api/users/'))) {
        (0, controllers_1.deleteUser)(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
};
exports.routes = routes;
