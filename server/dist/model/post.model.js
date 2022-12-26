"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const app_1 = require("../app");
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
Post.watch().on("change", (data) => {
    if (data.operationType === "insert") {
        const { _id: id } = data.fullDocument;
        Post.findById(id, {})
            .populate(["creator", "photo"])
            .exec((err, post) => {
            if (err)
                throw new Error(err.message);
            app_1.io.emit("post->insert", post);
        });
    }
    if (data.operationType === "delete") {
        app_1.io.emit("post->delete", data.documentKey._id);
    }
    if (data.operationType === "update") {
        const { _id: id } = data.documentKey;
        const { updatedFields } = data.updateDescription;
        app_1.io.emit("post->update", { id, updatedFields });
    }
});
exports.default = Post;
//# sourceMappingURL=post.model.js.map