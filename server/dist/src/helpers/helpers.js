"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimeStamp = void 0;
const parseTimeStamp = (value) => {
    const unixTimestamp = (value - 25569) * 86400;
    return Math.round(unixTimestamp * 1000);
};
exports.parseTimeStamp = parseTimeStamp;
//# sourceMappingURL=helpers.js.map