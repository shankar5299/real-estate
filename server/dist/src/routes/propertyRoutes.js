"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const propertiesControllers_1 = require("../controllers/propertiesControllers");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.get("/", propertiesControllers_1.getProperties);
router.get("/:id", propertiesControllers_1.getProperty);
router.post("/", (0, authMiddleware_1.authMiddleware)(["manager"]), upload.array('photos'), propertiesControllers_1.createProperty);
exports.default = router;
