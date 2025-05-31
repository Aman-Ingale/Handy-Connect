import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HelperModel from "@/models/Helper";
import ConsumerModel from "@/models/Consumer";
export async function POST(req) {
  await dbConnect();
  const data = await req.json()
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new HelperModel({ 
      firstname: data.firstname,
      location: data.location,
      lastname: data.lastname,
      profession: data.profession,
      pricing:data.pricing,
      pricingPer: data.pricingPer,
      email: data.email,
      password: hashedPassword,
      description : data.description,
      phone_number : data.phone,
      experience : data.experience,
      address : data.address,
      gender : data.gender,
      
    });
    await newUser.save();
    return NextResponse.json({ success: true, message: "USER REGISTERED SUCCESSFULLY" });
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}