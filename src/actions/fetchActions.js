"use server"

import ClientModel from "@/models/Client";

const { default: dbConnect } = require("@/lib/dbConnect")
const { default: providermodel } = require("@/models/Provider")

export async function getHelpers() {
    await dbConnect()
    const professionals = await providermodel.find({});
    const plainProfessionals = professionals.map(pro => JSON.parse(JSON.stringify(pro)));
    return plainProfessionals
}

export async function getProfessionalData(id){
    await dbConnect();
    const professional = await providermodel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return plainProfessionals
}
export async function getUserData(id){
    await dbConnect();
    const professional = await ClientModel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return plainProfessionals
}
export async function getProviderData(id){
    await dbConnect();
    const professional = await providermodel.findById(id);
    const plainProfessionals = JSON.parse(JSON.stringify(professional))
    return plainProfessionals
}