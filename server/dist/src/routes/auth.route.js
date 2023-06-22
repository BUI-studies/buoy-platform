"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.get("/", controllers_1.AuthController.verifyToken);
exports.authRoutes.post("/login", controllers_1.AuthController.login);
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
//# sourceMappingURL=auth.route.js.map