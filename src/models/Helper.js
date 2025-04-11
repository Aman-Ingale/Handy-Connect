import mongoose from "mongoose";
const HelperSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  location: String,
  profession: String,
  pricing: String,
  pricingPer: String,
  email: { type: String, unique: true },
  password:{ type: String, unique: true },
});
const HelperModel = mongoose.models?.Helper || mongoose.model("Helper", HelperSchema);
// const HelperModel = mongoose.model("Helper", HelperSchema);
export default HelperModel
