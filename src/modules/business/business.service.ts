import prisma from "../../utils/prisma";
import { CreateBusinessType } from "./business.schema";


export async function createBusiness(data: CreateBusinessType) {
    const business = await prisma.business.create({ data });
    return business;
}

export async function findBusiness(id: string) {
    return prisma.business.findFirst({ where: { id } });
}