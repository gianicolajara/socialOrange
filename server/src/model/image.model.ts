import { model, Schema } from "mongoose";

interface ImageInterface {
  name: string;
  extension: string;
}

const imageSchema = new Schema<ImageInterface>({
  name: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
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
