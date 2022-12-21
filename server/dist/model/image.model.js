"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    },
    relativePathUrl: {
        type: String,
    },
});
imageSchema.set("toJSON", {
    transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
const Image = (0, mongoose_1.model)("Image", imageSchema);
exports.default = Image;
//# sourceMappingURL=image.model.js.map