"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importStar(require("express"));
const utils_1 = require("@/utils");
const routes_1 = require("./routes/");
const app = (0, express_1.default)();
dotenv.config();
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
// Serve static files
app.use(express_1.default.static("./public"));
// Handle client-side routing
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
});
app.use("/api/auth", routes_1.authRoutes);
app.use("/api/meetings", utils_1.auth, routes_1.meetingsRoutes);
app.use("/api/payments", utils_1.auth, routes_1.paymentsRoutes);
app.use("/api/homeworks", utils_1.auth, routes_1.homeworksRoutes);
app.use("/api/users", utils_1.auth, routes_1.usersRoutes);
mongoose_1.default
    .connect(process.env.DB_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.error(err));
app.listen(process.env.SERVER_PORT, () => {
    utils_1.Sheets.init();
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map