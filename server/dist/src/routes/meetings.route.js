"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.meetingsRoutes = express_1.default.Router();
exports.meetingsRoutes.get("/", controllers_1.MeetingsController.get);
exports.meetingsRoutes.post("/", controllers_1.MeetingsController.save);
exports.meetingsRoutes.put("/", controllers_1.MeetingsController.update);
exports.meetingsRoutes.delete("/:id", controllers_1.MeetingsController.delete);
//# sourceMappingURL=meetings.route.js.map