"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const model_1 = require("../../model");
const authHelpers_1 = require("./authHelpers");
const freeOfAuth = ["/api/users/login", "/api/users", "/public"];
const auth = async (req, res, next) => {
    if (!freeOfAuth.some((url) => url === req.baseUrl)) {
        console.log(new Date().toTimeString(), "RERQUEST", req.method, req.baseUrl);
        if (!req.headers["authorization"]) {
            res.status(403);
            res.send({ message: "permission denied" });
            return;
        }
        const token = req.headers["authorization"];
        try {
            const decoded = await (0, authHelpers_1.decode)(token);
            if (!decoded) {
                res.status(550);
                res.send({ message: "couldn't decode token" });
                return;
            }
            const { email } = decoded;
            const userFromDB = await model_1.UsersModel.findOne({
                email,
            });
            if (!userFromDB) {
                res.status(403);
                res.send({ message: "permission denied" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(400);
            res.send({ message: "invalid data" });
            return;
        }
        next();
    }
    else {
        next();
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map