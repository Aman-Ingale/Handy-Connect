import { NextResponse } from "next/server";

export async function GET(req){
    const logout=true;
    try {
        if(logout){
            return NextResponse.json({success:true,message:"Log Out Succesfull"})
        }
    } catch (error) {
        return NextResponse.json({success:false,message:error})

    }
    
}