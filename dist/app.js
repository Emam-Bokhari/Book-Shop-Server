'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const routes_1 = __importDefault(require('./app/routes'));
const globalErrorHandler_1 = require('./app/middlewares/globalErrorHandler');
const notFound_1 = __importDefault(require('./app/middlewares/notFound'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(
  (0, cors_1.default)({
    origin: ['https://book-shop-client-mauve.vercel.app'],
    credentials: true,
  }),
);
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
// application routes
app.use('/api/v1', routes_1.default);
// check server health
app.get('/', (req, res) => {
  res.send('Server is running...');
});
// global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// not found handler
app.use(notFound_1.default);
exports.default = app;
