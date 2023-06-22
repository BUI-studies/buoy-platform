"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModel = exports.PaymentsSchema = exports.payemntsMapper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("@/utils");
const helpers_1 = require("@/helpers");
const Schema = mongoose_1.default.Schema;
const payemntsMapper = (cellsArray) => ({
    timestamp: (0, helpers_1.parseTimeStamp)(utils_1.Sheets.getCellValueFromRawData(cellsArray[0])),
    amount: utils_1.Sheets.getCellValueFromRawData(cellsArray[1]),
    sender: utils_1.Sheets.getCellValueFromRawData(cellsArray[2]),
    comment: utils_1.Sheets.getCellValueFromRawData(cellsArray[3]),
});
exports.payemntsMapper = payemntsMapper;
exports.PaymentsSchema = new Schema({});
exports.PaymentsModel = mongoose_1.default.model("Payments", exports.PaymentsSchema);
//# sourceMappingURL=payments.model.js.map