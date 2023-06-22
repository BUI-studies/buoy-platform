"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@/controllers/");
exports.usersRoutes = express_1.default.Router();
exports.usersRoutes.get("/", controllers_1.UsersController.getAll);
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
//# sourceMappingURL=users.route.js.map