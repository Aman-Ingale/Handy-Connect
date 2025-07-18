import dbConnect from "@/lib/dbConnect";
import providermodel from "@/models/Provider";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    await dbConnect();
    const {id} = await params;
    const professional = await providermodel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return NextResponse.json(plainProfessionals)
}
export async function PUT(req,{params}){
    await dbConnect();
    const {id} = await params;
    const updateData = await req.json();
    // console.log(updateData)
    try {
        // if (!ObjectId.isValid(id)) 
        //     return NextResponse.json({success:false,data:{}});
        const professional = await providermodel.updateOne(
        { _id: id },
        { $set: updateData}
    );
        return NextResponse.json({success:true,data:professional});
    } catch (error) { 
        console.log(error)
        return NextResponse.json({success:false,data:{}});

    }
}
