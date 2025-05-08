"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenantsControllers_1 = require("../controllers/tenantsControllers");
const router = express_1.default.Router();
router.get("/:cognitoId", tenantsControllers_1.getTenant);
router.put("/:cognitoId", tenantsControllers_1.updateTenant);
router.get("/:cognitoId/current-residences", tenantsControllers_1.getCurrentResidences);
router.post("/:cognitoId/favorites/:propertyId", tenantsControllers_1.addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", tenantsControllers_1.removeFavoriteProperty);
router.post("/", tenantsControllers_1.createTenant);
exports.default = router;
