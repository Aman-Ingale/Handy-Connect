import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HelperModel from "@/models/Helper";
import ConsumerModel from "@/models/Consumer";
export async function POST(req){
  await dbConnect();
  const data = await req.json();
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new ConsumerModel({ 
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
      gender : data.gender,
      location : data.location,
      address : data.address,
      phone_number  : data.phone
    });
    await newUser.save();
    return NextResponse.json({ success: true, message: "USER REGISTERED SUCCESSFULLY" });
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}