import dbConnect from "@/lib/dbConnect";
import HelperModel from "@/models/Helper";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const professionals = await HelperModel.find({});
    const plainProfessionals = professionals.map(pro => JSON.parse(JSON.stringify(pro)));
    return NextResponse.json(plainProfessionals)
}