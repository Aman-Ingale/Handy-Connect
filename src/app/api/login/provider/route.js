import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import providermodel from "@/models/Provider";
import ClientModel from "@/models/Client";
export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  try {
    const user = await providermodel.findOne({
      email: data.email
    });

    if (!user) {
      console.log("Email is Incorrect");
      return NextResponse.json({ success: false, message: "Invalid Email" });
    }
    console.log(user.password);
    console.log(data.password);
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      console.log("Password is Incorrect");
      return NextResponse.json({ success: false, message: "Incorrect Password" });
    }

    const savedUser = await user.save();
    const UserID = savedUser._id.toString()

    return NextResponse.json({ success: true, message: "User logged in successfully", data : UserID });
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}  
  // export async function POST(req) {
//   await dbConnect();
//   const data = await req.json(); 
//   console.log(data.email);
//   console.log(data.password);
//   try {
//     const user = await ClientModel.findOne({
//       email: data.email
//     });
//     if (!user) {
//       console.log("Email is Incorrect");
//       return NextResponse.json({ success: false, message: "Invalid Email" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

//     if (!isPasswordCorrect) {
//       console.log("Password is Incorrect");
//       return NextResponse.json({ success: false, message: "Incorrect Password" });
//     }

//     user.lastLogin = Date.now();
//     const savedUser = await user.save();
//     const UserID = savedUser._id.toString()
//     // await createSession(user._id.toString());

//     return NextResponse.json({ success: true, message: "User logged in successfully", data : UserID });
//   } catch (error) {
//     console.log("Authorization Error:", error);
//     return null;
//   }
// }