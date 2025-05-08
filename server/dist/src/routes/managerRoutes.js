"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managersControllers_1 = require("../controllers/managersControllers");
const router = express_1.default.Router();
router.get("/:cognitoId", managersControllers_1.getManager);
router.put("/:cognitoId", managersControllers_1.updateManager);
router.get("/:cognitoId/properties", managersControllers_1.getManagerProperties);
router.post("/", managersControllers_1.createManager);
exports.default = router;
