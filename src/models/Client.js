import mongoose from "mongoose";
const ClientSchema = new mongoose.Schema({
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
  service_completed : {type : Number, default :0},
  address : String,
  location : String,
});
const ClientModel = mongoose.models?.client || mongoose.model("client", ClientSchema);
export default ClientModel