"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageById = exports.createImage = void 0;
const config_1 = require("../config");
const files_util_1 = require("../utils/files.util");
const image_model_1 = __importDefault(require("../model/image.model"));
const fs_1 = __importDefault(require("fs"));
const createImage = (req, res, next) => {
    var _a;
    const files = (_a = req.files) === null || _a === void 0 ? void 0 : _a.files;
    if (!req.files && !files)
        return res.status(400).json({
            message: "you must send a picture",
        });
    const extension = files.name.split(".")[1];
    const newImage = new image_model_1.default({
        name: files.name,
        extension,
    });
    newImage
        .save()
        .then((imageRes) => {
        (0, files_util_1.createPhoto)(`${config_1.BASE_URL}/public/images/${imageRes.id}.${extension}`, files);
        image_model_1.default.findByIdAndUpdate(imageRes.id, {
            relativePathUrl: `${config_1.URL_IMAGES_FRONTEND}/${imageRes.id}.${imageRes.extension}`,
        }, (err) => {
            if (err)
                return next(err);
            return res.status(200).json({
                message: "image saved successfully",
                imageRes,
            });
        });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.createImage = createImage;
const deleteImageById = (req, res, next) => {
    const { id } = req.params;
    image_model_1.default.findByIdAndDelete(id, {}, (err, doc) => {
        if (err)
            return next(err);
        if (!doc)
            return res.status(404);
        fs_1.default.unlink(`${config_1.BASE_URL}/public/images/${doc.id}.${doc.extension}`, (err) => {
            if (err)
                return next(err);
        });
        return res.status(200).json({
            message: "image delete successfully",
        });
    });
};
exports.deleteImageById = deleteImageById;
//# sourceMappingURL=images.controller.js.map