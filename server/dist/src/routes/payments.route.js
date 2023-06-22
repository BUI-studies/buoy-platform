"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@/controllers");
exports.paymentsRoutes = express_1.default.Router();
exports.paymentsRoutes.get("/", controllers_1.PaymentsController.get);
exports.paymentsRoutes.post("/", controllers_1.PaymentsController.save);
exports.paymentsRoutes.put("/", controllers_1.PaymentsController.update);
exports.paymentsRoutes.delete("/:id", controllers_1.PaymentsController.delete);
//# sourceMappingURL=payments.route.js.map