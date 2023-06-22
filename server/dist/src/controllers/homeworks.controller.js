"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworksController = void 0;
const model_1 = require("@/model");
const types_1 = require("@/types");
const utils_1 = require("@/utils");
const getAllHomeworks = async () => {
    await utils_1.Sheets.doc?.loadInfo();
    return utils_1.Sheets.parseRows(utils_1.Sheets.tables?.[types_1.SHEETS_TITLES.HOMEWORKS]._cells?.filter((r) => {
        return r[0]._row > 0;
    }), model_1.homeworksMapper);
};
const getAll = async (req, res) => {
    const { fullname } = req.query;
    const allHomeworks = await getAllHomeworks();
    if (!fullname) {
        return res.send(allHomeworks);
    }
    const [name, surname] = fullname?.split(" ");
    await utils_1.Sheets.doc?.loadInfo();
    const allHomeworksNamed = allHomeworks.filter(({ sender }) => sender === `${name}_${surname}`);
    res.send(allHomeworksNamed);
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
exports.HomeworksController = {
    get: getAll,
    save: saveMeeting,
    update: updateMeeting,
    delete: deleteMeeting,
};
//# sourceMappingURL=homeworks.controller.js.map