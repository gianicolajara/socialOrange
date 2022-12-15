import { UserInterface, UserModel } from "interfaces";
import { model, Schema } from "mongoose";
import uniqueValidators from "mongoose-unique-validator";
import { hash, validate } from "../utils/bcrypt.util";

export const userSchema = new Schema<UserInterface, UserModel>(
  {
    username: {
      type: String,
      unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.static("hashPassword", function hashPassword(password: string) {
  return hash(password);
});

userSchema.static(
  "validatePassword",
  function validatePassword(password: string, hash: string) {
    return validate(password, hash);
  }
);

userSchema.plugin(uniqueValidators);

const User = model<UserInterface, UserModel>("User", userSchema);

export default User;
