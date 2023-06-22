"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_spreadsheet_1 = require("google-spreadsheet");
class Sheets {
    static init() {
        Sheets.getDoc();
    }
    static async getDoc() {
        const doc = new google_spreadsheet_1.GoogleSpreadsheet(process.env.SPREASHEET_ID);
        await doc.useServiceAccountAuth({
            private_key: process.env.SPREADSHEET_PRIVATE_KEY || "",
            client_email: process.env.SPREADSHEET_CLIENT_EMAIL || "",
        });
        await doc.loadInfo(true);
        Sheets.doc = doc || null;
        Sheets.tablesTitles = Object.keys(doc?.sheetsByTitle) || null;
        Sheets.tables = doc?.sheetsByTitle || null;
    }
    static parseRows(rows, rowToObjectMapper) {
        return rows
            .map((r, index) => rowToObjectMapper(r.map(({ _row, _column, _rawData }) => ({
            row: _row,
            col: _column,
            _rawData,
        })), index))
            .filter((v) => Object.keys(JSON.parse(JSON.stringify(v))).length > 0);
    }
    static getCellValueFromRawData(cell) {
        return (cell._rawData?.effectiveValue?.stringValue ||
            cell._rawData?.effectiveValue?.numberValue ||
            cell._rawData?.effectiveValue?.boolValue);
    }
}
Sheets.doc = null;
Sheets.tables = null;
Sheets.tablesTitles = null;
exports.default = Sheets;
//# sourceMappingURL=Sheets.js.map