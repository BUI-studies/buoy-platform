"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (userFromDB) => {
    if (!process.env.SECRET_KEY)
        return null;
    const payload = {
        _id: userFromDB._id,
        email: userFromDB.email,
    };
    let token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    return token;
};
exports.getToken = getToken;
const decode = (auth) => {
    if (!process.env.SECRET_KEY)
        return null;
    try {
        return jsonwebtoken_1.default.verify(auth, process.env.SECRET_KEY);
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.decode = decode;
const authHelpers = {
    decode: exports.decode,
    getToken: exports.getToken,
};
exports.default = authHelpers;
//# sourceMappingURL=authHelpers.js.map