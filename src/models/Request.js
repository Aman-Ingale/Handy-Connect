import mongoose from "mongoose";
const RequestSchema = new mongoose.Schema({
  jobtitle: String,
  location: String,
  description : String,
  date : Date,
  address :String,
  status: {
    type:String,
    enum :['Pending','In Progress','Completed','Cancelled']
  },
  providerId : {type : String, require : true},
  clientId : {type : String, require : true},
  request_date : {type:Date, default: Date.now()}
});
const RequestModel = mongoose.models?.request || mongoose.model("request", RequestSchema);
export default RequestModel