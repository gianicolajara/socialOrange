"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    posts: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Post",
    },
}, {
    timestamps: true,
});
exports.userSchema.set("toJSON", {
    transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    },
});
exports.userSchema.static("hashPassword", function hashPassword(password) {
    return (0, bcrypt_util_1.hash)(password);
});
exports.userSchema.static("validatePassword", function validatePassword(password, hash) {
    return (0, bcrypt_util_1.validate)(password, hash);
});
exports.userSchema.plugin(mongoose_unique_validator_1.default);
const User = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map