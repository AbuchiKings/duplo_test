import crypto from "crypto";

import _ from "lodash";
import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";

import * as User from './user.service'
import { CreateUserType, LoginUserType } from "./user.schema";
import { CreatedSuccessResponse, SuccessResponse } from "../../utils/ApiResponse";
import { AuthFailureError } from "../../utils/ApiError";
import { createToken } from "../../middlewares/auth";
import { setJson } from "../../cache/query";
import { UserInterface } from "../../utils/interface";

class UserController {
    public static async createUser(req: FastifyRequest<{ Body: CreateUserType }>, res: FastifyReply) {
        const { role, email, password, name, businessId, department } = req.body;
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.createUser({ role, email, password: passwordHash, name, businessId, department });
        const data = getUserData(user);
        return new CreatedSuccessResponse('User successfully created', data, 1).send(res);
    }

    public static async login(req: FastifyRequest<{ Body: LoginUserType }>, res: FastifyReply) {
        const { email, password, } = req.body;

        const login = await User.findUser(email);
        if (!login) throw new AuthFailureError('Incorrect email or password.');

        const match = await bcrypt.compare(password, login.password!);
        if (!match) throw new AuthFailureError('Incorrect email or password.');

        const accessTokenKey = crypto.randomBytes(64).toString('hex');

        const token = await createToken(login, accessTokenKey);
        const data = getUserData(login);

        await setJson(`${data.id}:${accessTokenKey}`, data, 75 * 3600)
        return new SuccessResponse('User successfully logged in.', { ...data, token }, 1).send(res);
    }
}

function getUserData(user: UserInterface) {
    const data = _.omit(user, ['password']);
    return data;
}

export default UserController;