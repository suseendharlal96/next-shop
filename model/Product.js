import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Description is required"],
  },
  creator: {
    type: String,
    required: [true, "Creator is required"],
  },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
