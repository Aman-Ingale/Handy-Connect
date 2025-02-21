import mongoose from "mongoose";

const HelperScema = mongoose.Schema({
    firstname: String,
    lastname: String,
    location: String,
    profession: String,
    pricing: String,
    pricingPer: String,
    email: String,
    password: String,
})

export default HelperModel = mongoose.models.helper || mongoose.model("helpers",HelperScema)