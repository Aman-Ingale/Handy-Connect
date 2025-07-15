import dbConnect from "@/lib/dbConnect";
import providermodel from "@/models/Provider";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    await dbConnect();
    const {id} = await params;
    const professional = await providermodel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return NextResponse.json(plainProfessionals);
}