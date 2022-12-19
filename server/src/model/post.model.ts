import { PostInterface } from "interfaces";
import { Schema, model } from "mongoose";
import uniqueValidators from "mongoose-unique-validator";

const postSchema = new Schema<PostInterface>(
  {
    post: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    commentaries: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(uniqueValidators);

postSchema.set("toJSON", {
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Post = model<PostInterface>("Post", postSchema);

export default Post;
