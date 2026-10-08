"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const node_dns_1 = __importDefault(require("node:dns"));
const node_process_1 = require("node:process");
const Utils_1 = require("./Utils");
const envPath = node_path_1.default.join(__dirname, '../.env');
if ((0, node_fs_1.existsSync)(envPath)) {
    (0, node_process_1.loadEnvFile)(envPath);
}
node_dns_1.default.setServers(['1.1.1.1', '8.8.8.8']);
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (_req, res) => {
    res.send('Hello, World!');
});
exports.app.get('/hello', (_req, res) => {
    res.send(Utils_1.Utils.helloworld());
});
exports.app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Invalid numbers');
    }
    res.json({ result: Utils_1.Utils.add(a, b) });
});
exports.app.use(express_1.default.static(node_path_1.default.join(__dirname, '../public')));
exports.app.use('/api', UserRoutes_1.default);
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        database: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});
if (require.main === module) {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
        mongoose_1.default
            .connect(mongoUri)
            .then(() => {
            console.log('Connected to MongoDB');
            const port = Number(process.env.PORT) || 3000;
            exports.app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        })
            .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            const port = Number(process.env.PORT) || 3000;
            exports.app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port} (without DB)`);
            });
        });
    }
    else {
        const port = Number(process.env.PORT) || 3000;
        exports.app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
}
