"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const postSchema = new mongoose_1.Schema({
    post: {
        type: String,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    photo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Image",
    },
    commentaries: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
postSchema.plugin(mongoose_unique_validator_1.default);
postSchema.set("toJSON", {
    transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=post.model.js.map