import prisma from "../../utils/prisma";
import { CreateUserType } from "./user.schema";


export async function createUser(data: CreateUserType) {
    const user = await prisma.user.create({ data });
    return user;
}


export async function findUser(email: string) {
    return prisma.user.findFirst({ where: { email } });
}