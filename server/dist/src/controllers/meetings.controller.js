"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingsController = void 0;
const model_1 = require("@/model");
const types_1 = require("@/types");
const utils_1 = require("@/utils");
const getAllMeetings = async () => {
    await utils_1.Sheets.doc?.loadInfo();
    return utils_1.Sheets.parseRows(utils_1.Sheets.tables?.[types_1.SHEETS_TITLES.MEETINGS]._cells, model_1.meetingsMapper).filter(({ students }) => !!students);
};
const getAll = async (req, res) => {
    const { fullname } = req.query;
    const allMeetings = await getAllMeetings();
    if (!fullname) {
        return res.send(allMeetings);
    }
    const [name, surname] = fullname?.split(" ");
    await utils_1.Sheets.doc?.loadInfo();
    const allMeetingsNamed = allMeetings.filter(({ students }) => students?.includes(`${name}_${surname}`));
    res.send(allMeetingsNamed);
};
const saveMeeting = async (req, res) => {
    res.send({});
};
const updateMeeting = async (req, res) => {
    res.send({});
};
const deleteMeeting = async (req, res) => {
    res.send({});
};
exports.MeetingsController = {
    get: getAll,
    save: saveMeeting,
    update: updateMeeting,
    delete: deleteMeeting,
};
//# sourceMappingURL=meetings.controller.js.map