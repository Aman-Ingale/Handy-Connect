"use server"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HelperModel from "@/models/Helper";
import ConsumerModel from "@/models/Consumer";
// import { createSession } from "@/lib/session";

export async function signUpConsumer(formData) {
  await dbConnect();
  let data;
  if (formData instanceof FormData) {
    data = Object.fromEntries(formData.entries());
  } else if (typeof formData === "object") {
    data = formData; // Handle JSON objects directly
  } else {
    throw new Error("Invalid formData format");
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new ConsumerModel({ 
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true, message: "USER REGISTERED SUCCESSFULLY" };
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}
export async function signUpHelper(formData) {
  await dbConnect();
  let data;
  if (formData instanceof FormData) {
    data = Object.fromEntries(formData.entries());
  } else if (typeof formData === "object") {
    data = formData; // Handle JSON objects directly
  } else {
    throw new Error("Invalid formData format");
  }

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
    });
    await newUser.save();
    return { success: true, message: "USER REGISTERED SUCCESSFULLY" };
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}

export async function signInConsumer(formData) {
  await dbConnect();
  let data;
  if (formData instanceof FormData) {
    data = Object.fromEntries(formData.entries());
  } else if (typeof formData === "object") {
    data = formData;
  } else {
    throw new Error("Invalid formData format");
  }

  try {
    const user = await ConsumerModel.findOne({
      email: data.email
    });

    if (!user) {
      console.log("Email is Incorrect");
      return { success: false, message: "Invalid Email" };
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      console.log("Password is Incorrect");
      return { success: false, message: "Incorrect Password" };
    }

    user.lastLogin = Date.now();
    await user.save();
    // await createSession(user._id.toString());

    return { success: true, message: "User logged in successfully" };
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}
export async function signInHelper(formData) {
  await dbConnect();
  let data;
  if (formData instanceof FormData) {
    data = Object.fromEntries(formData.entries());
  } else if (typeof formData === "object") {
    data = formData;
  } else {
    throw new Error("Invalid formData format");
  }
  try {
    const user = await HelperModel.findOne({
      email: data.email
    });

    if (!user) {
      console.log("Email is Incorrect");
      return { success: false, message: "Invalid Email" };
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      console.log("Password is Incorrect");
      return { success: false, message: "Incorrect Password" };
    }

    await user.save();
    // await createSession(user._id.toString());

    return { success: true, message: "User logged in successfully" };
  } catch (error) {
    console.log("Authorization Error:", error);
    return null;
  }
}
