import dbConnect from "@/lib/dbConnect";
import providermodel from "@/models/Provider";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const professionals = await providermodel.find({});
    const plainProfessionals = professionals.map(pro => JSON.parse(JSON.stringify(pro)));
    return NextResponse.json(plainProfessionals)
}