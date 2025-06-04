import dbConnect from "@/lib/dbConnect";
import HelperModel from "@/models/Helper";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    await dbConnect();
    const {id} = await params;
    const professional = await HelperModel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return NextResponse.json(plainProfessionals);
}