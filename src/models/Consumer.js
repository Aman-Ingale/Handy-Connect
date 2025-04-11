import mongoose from "mongoose";
const ConsumerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password:{ type: String, unique: true }
});
const ConsumerModel = mongoose.models?.Consumer || mongoose.model("Consumer", ConsumerSchema);
// const ConsumerModel = mongoose.model("Consumer", ConsumerSchema);
export default ConsumerModel