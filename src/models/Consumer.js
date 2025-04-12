import mongoose from "mongoose";
const ConsumerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password:{ type: String, unique: true },
  phone_number : {type : String, required : true,default : "-"},
  registration_on : {type:Date, default:Date.now()},
  gender: {
    type: String,
    enum: ['male', 'female'],
    default:'male'
    //required : true
  },
  service_booked : {type : Number, default :0},
  service_completed : {type : Number, default :0}
});
const ConsumerModel = mongoose.models?.Consumer || mongoose.model("Consumer", ConsumerSchema);
// const ConsumerModel = mongoose.model("Consumer", ConsumerSchema);
export default ConsumerModel