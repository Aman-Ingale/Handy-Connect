"use server"

const { default: dbConnect } = require("@/lib/dbConnect")
const { default: HelperModel } = require("@/models/Helper")

export async function getHelpers() {
    await dbConnect()
    const professionals = await HelperModel.find({});
    const plainProfessionals = professionals.map(pro => JSON.parse(JSON.stringify(pro)));
    return plainProfessionals
}