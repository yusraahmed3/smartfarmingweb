import mongoose from "mongoose";

const fieldSchema = mongoose.Schema({
  value: String,
  date: { type: String, default: Date.now() },
});

const channelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  fieldName1: String,
  fieldName2: String,
  fieldName3: String,
  fieldValue1: [fieldSchema],
  fieldValue2: [fieldSchema],
  fieldValue3: [fieldSchema],
  longitute: {
    type: String,
    default: null,
  },
  latitude: {
    type: String,
    default: null,
  },
  pumpController: { type: String, default: "0" },
  fanController: { type: String, default: "0" },
});

// channelSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });
// channelSchema.set("toJSON", {
//   virtuals: true,
// });

export default mongoose.model("Channel", channelSchema);
