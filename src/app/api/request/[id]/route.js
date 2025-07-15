import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();
        const request = new RequestModel({
            jobtitle: data.jobtitle,
            location: data.location,
            description: data.description,
            date: data.date,
            address: data.address,
            clientId: data.clientId,
            status:'Pending',
            providerId: data.providerId
        })
        console.log(request)
        await request.save();
        return NextResponse.json({ success: true, message: "Request Sent" });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: true, message: "Something went wrong" });;
    }
}
export async function GET(req,{params}) {
    try {
        const {id} = await params;
        const sender = req.nextUrl.searchParams.get('sender')
        await dbConnect()
        // console.log(id)
        console.log(sender)
        if(sender=="provider"){
            const requests = await RequestModel.find({providerId:id});
            return NextResponse.json(requests)
        }else{
            const requests = await RequestModel.find({clientId:id}) 
            return NextResponse.json(requests)

        }
        // const plainRequets = requests.map(pro => JSON.parse(JSON.stringify(pro)));
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error})

    }
}

export async function PUT(req){
    await dbConnect();
    const {id} = await params;
    const updateData = await req.json();
    // console.log(updateData)
    try {
        const request = await RequestModel.updateOne(
        { _id: id },
        { $set: updateData}
    );
        return NextResponse.json({success:true,data:professional});
    } catch (error) { 
        console.log(error)
        return NextResponse.json({success:false,data:{}});

    }
}
