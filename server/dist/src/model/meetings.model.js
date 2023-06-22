"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingsModel = exports.MeetingsSchema = exports.meetingsMapper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("@/helpers");
const utils_1 = require("@/utils");
const Schema = mongoose_1.default.Schema;
const meetingsMapper = (cellsArray) => ({
    id: utils_1.Sheets.getCellValueFromRawData(cellsArray[0]),
    timestamp: (0, helpers_1.parseTimeStamp)(utils_1.Sheets.getCellValueFromRawData(cellsArray[1])),
    title: utils_1.Sheets.getCellValueFromRawData(cellsArray[2]),
    type: utils_1.Sheets.getCellValueFromRawData(cellsArray[3]),
    students: utils_1.Sheets.getCellValueFromRawData(cellsArray[4])
        ?.split(", ")
        ?.filter((v) => !!v),
    mentor: utils_1.Sheets.getCellValueFromRawData(cellsArray[5]),
    comment: utils_1.Sheets.getCellValueFromRawData(cellsArray[6]),
    report: utils_1.Sheets.getCellValueFromRawData(cellsArray[9]),
});
exports.meetingsMapper = meetingsMapper;
exports.MeetingsSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
});
exports.MeetingsModel = mongoose_1.default.model("Meetings", exports.MeetingsSchema);
//# sourceMappingURL=meetings.model.js.map