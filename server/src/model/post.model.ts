import { PostInterface } from "interfaces";
import { Schema, model } from "mongoose";
import uniqueValidators from "mongoose-unique-validator";
import { io } from "../app";

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
    likes: {
      type: Number,
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

Post.watch().on("change", (data) => {
  if (data.operationType === "insert") {
    const { _id: id } = data.fullDocument;

    Post.findById(id, {})
      .populate(["creator", "photo"])
      .exec((err, post) => {
        if (err) throw new Error(err.message);

        io.emit("post->insert", post);
      });
  }

  if (data.operationType === "delete") {
    io.emit("post->delete", data.documentKey._id);
  }

  if (data.operationType === "update") {
    const { _id: id } = data.documentKey;
    const { updatedFields } = data.updateDescription;

    io.emit("post->update", { id, updatedFields });
  }
});

export default Post;
