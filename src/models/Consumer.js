import mongoose from "mongoose";

const ConsumerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    location: String,
    profession: String,
    pricing: String,
    pricingPer: String,
    email: String,
    password: String,
})

export default ConsumerModel = mongoose.models.consumer || mongoose.model("consumer",ConsumerSchema)