"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const model_1 = require("@/model");
const types_1 = require("@/types");
const utils_1 = require("@/utils");
const getAllPayments = async () => {
    await utils_1.Sheets.doc?.loadInfo();
    return utils_1.Sheets.parseRows(utils_1.Sheets.tables?.[types_1.SHEETS_TITLES.PAYMENTS]._cells, model_1.payemntsMapper);
};
const getAll = async (req, res) => {
    const { fullname } = req.query;
    const allPayments = await getAllPayments();
    if (!fullname) {
        return res.send(allPayments);
    }
    const [name, surname] = fullname?.split(" ");
    await utils_1.Sheets.doc?.loadInfo();
    const allPaymentsNamed = allPayments.filter(({ sender }) => sender === `${name}_${surname}`);
    res.send(allPaymentsNamed);
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
exports.PaymentsController = {
    get: getAll,
    save: saveMeeting,
    update: updateMeeting,
    delete: deleteMeeting,
};
//# sourceMappingURL=payments.controller.js.map