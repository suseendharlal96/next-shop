import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
  cart: [],
  order: [],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
