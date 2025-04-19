import mongoose from "mongoose";
const HelperSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  location: String,
  profession: String,
  email: { type: String, unique: true },
  password:{ type: String, unique: true },
  completed_jobs:{type:Number, default:0},
  description:{type:String,default:""},
  gender: {
    type: String,
    enum: ['male', 'female'], //required : true
  },
  experience:{type:Number,default:0},
  verified:{type:Boolean,default:false},
  total_earnings : {type:Number,default:0},
  total_ratings : {type : Number, default : 0},
  total_stars : {type : Number, default : 0},
  phone_number : {type : String, required : true,default : "-"},
  registration_on : {type:Date, default:Date.now()},
  ratings : [{
    id: Number,
    stars:Number,
    review:String,
  },],
  address : String,
  jobs : [{
    customer_name : String,
    job_description : String,
    amount : Number,
    job_date : Date,
    job_ratings : {
      stars : Number,
      review : String,
    },

  }]
});
const HelperModel = mongoose.models?.Helper || mongoose.model("Helper", HelperSchema);
// const HelperModel = mongoose.model("Helper", HelperSchema);
export default HelperModel

