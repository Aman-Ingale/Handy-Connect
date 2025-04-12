"use server"

import ConsumerModel from "@/models/Consumer";

const { default: dbConnect } = require("@/lib/dbConnect")
const { default: HelperModel } = require("@/models/Helper")

export async function getHelpers() {
    await dbConnect()
    const professionals = await HelperModel.find({});
    const plainProfessionals = professionals.map(pro => JSON.parse(JSON.stringify(pro)));
    return plainProfessionals
}

export async function getProfessionalData(id){
    await dbConnect();
    const professional = await HelperModel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return plainProfessionals
}
export async function getUserData(id){
    await dbConnect();
    const professional = await ConsumerModel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return plainProfessionals
}