"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworksModel = exports.HomerwoksSchema = exports.homeworksMapper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("@/utils");
const helpers_1 = require("@/helpers");
const Schema = mongoose_1.default.Schema;
const homeworksMapper = (cellsArray) => ({
    timestamp: (0, helpers_1.parseTimeStamp)(utils_1.Sheets.getCellValueFromRawData(cellsArray[0])),
    sender: utils_1.Sheets.getCellValueFromRawData(cellsArray[1]),
    homeworkName: utils_1.Sheets.getCellValueFromRawData(cellsArray[2]),
    github: utils_1.Sheets.getCellValueFromRawData(cellsArray[3]),
    isReviewed: utils_1.Sheets.getCellValueFromRawData(cellsArray[4]),
    reviewLink: utils_1.Sheets.getCellValueFromRawData(cellsArray[5]) || null,
    mentorsComment: utils_1.Sheets.getCellValueFromRawData(cellsArray[6]) || null,
    studentsComment: utils_1.Sheets.getCellValueFromRawData(cellsArray[7]) || null,
});
exports.homeworksMapper = homeworksMapper;
exports.HomerwoksSchema = new Schema({});
exports.HomeworksModel = mongoose_1.default.model("Homerwoks", exports.HomerwoksSchema);
//# sourceMappingURL=homeworks.model.js.map