"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASS,
    success_url: process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_SUCCESS_URL
        : process.env.SUCCESS_URL,
    fail_url: process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_SUCCESS_URL
        : process.env.FAIL_URL,
    cancel_url: process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_CANCEL_URL
        : process.env.CANCEL_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
