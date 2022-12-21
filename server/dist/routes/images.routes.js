"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_controller_1 = require("../controllers/images.controller");
const imageRouter = (0, express_1.Router)();
imageRouter.post("/", images_controller_1.createImage);
imageRouter.delete("/:id", images_controller_1.deleteImageById);
exports.default = imageRouter;
//# sourceMappingURL=images.routes.js.map