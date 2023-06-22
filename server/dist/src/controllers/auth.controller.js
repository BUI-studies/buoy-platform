"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const model_1 = require("../model");
const utils_1 = require("../utils");
const login = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(403);
        res.send({ message: "invalid data" });
        return;
    }
    const userFromDB = await model_1.UsersModel.findOne({
        email: req.body.email,
    });
    if (!userFromDB || !userFromDB.password || !userFromDB.email) {
        res.status(404);
        res.send({ message: "no such user" });
        return;
    }
    const isValidPassword = await bcrypt_1.default.compare(req.body.password, userFromDB.password);
    if (!isValidPassword) {
        res.status(203);
        res.send({ message: "invalid password" });
        return;
    }
    const userDTO = {
        _id: userFromDB._id,
        email: userFromDB.email,
        fullName: userFromDB.fullName,
        tel: userFromDB.tel,
    };
    res.send({
        token: (0, utils_1.getToken)(userDTO),
        data: userDTO,
    });
};
const verifyToken = async (req, res) => {
    if (!req.query.token) {
        res.status(403);
        res.send({ message: "no token" });
    }
    const token = req.query.token;
    try {
        const verified = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY || "");
        const userFromDB = await model_1.UsersModel.findOne({
            _id: verified?._id,
            email: verified?.email,
        });
        if (!userFromDB) {
            res.status(404);
            res.send({ message: "no such user" });
            return;
        }
        res.send({
            message: "token verified",
            data: {
                _id: userFromDB._id,
                email: userFromDB.email,
                fullName: userFromDB.fullName,
                tel: userFromDB.tel,
            },
        });
    }
    catch (error) {
        res.status(403);
        res.send({ message: "invalid token", error });
    }
};
exports.AuthController = {
    login,
    verifyToken,
};
//# sourceMappingURL=auth.controller.js.map