"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeworksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@/controllers");
exports.homeworksRoutes = express_1.default.Router();
exports.homeworksRoutes.get("/", controllers_1.HomeworksController.get);
exports.homeworksRoutes.post("/", controllers_1.HomeworksController.save);
exports.homeworksRoutes.put("/", controllers_1.HomeworksController.update);
exports.homeworksRoutes.delete("/:id", controllers_1.HomeworksController.delete);
//# sourceMappingURL=homeworks.route.js.map