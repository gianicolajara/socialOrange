import { ImageInterface } from "interfaces";
import { model, Schema } from "mongoose";

const imageSchema = new Schema<ImageInterface>({
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

const Image = model<ImageInterface>("Image", imageSchema);

export default Image;
