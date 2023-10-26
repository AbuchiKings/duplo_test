import { AuthFailureError, BadTokenError } from '../utils/ApiError';
import { ProtectedRequest, UserInterface } from '../utils/interface'
import { getJson } from '../cache/query'

const SECRET = process.env.JWT_KEY;

import { promisify } from 'util';

import { sign, verify } from 'jsonwebtoken';


export const signToken = async (payload: JwtPayload): Promise<string> => {
    // @ts-ignore
    return promisify(sign)({ ...payload }, SECRET);
}

export const validate = (token: string): Promise<JwtPayload> => {
    // @ts-ignore
    return promisify(verify)(token, SECRET);
}


export class JwtPayload {
    aud: string;
    key?: string;
    iss?: string;
    iat?: number;
    exp?: number;
    sub?: string;
    email: string


    constructor(sub: string, key: string, email: string) {
        this.iss = 'issuer';
        this.aud = 'access';
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + 3 * 24 * 60 * 60;
        this.email = email
        this.key = key
        this.sub = sub
    }
}

export const createToken = async (user: UserInterface, accessTokenKey: string): Promise<string> => {
    const accessToken = await signToken(
        new JwtPayload(
            user.id,
            accessTokenKey,
            user.email || ''
        ),
    );
    return accessToken
};

export const getAccessToken = (authorization?: string) => {
    if (!authorization) throw new AuthFailureError('Invalid Authorization');
    if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization');
    return authorization.split(' ')[1];
};



export const verifyToken = async (req: ProtectedRequest, res: Response) => {
    try {
        req.accessToken = getAccessToken(req.headers.authorization);

        const payload = await validate(req.accessToken);
        if (!payload.sub || !payload.key) throw new BadTokenError()

        const user = await getJson<UserInterface>(`${payload.sub}:${payload.key}`)
        if (!user) throw new AuthFailureError('Invalid Authorization.');
        req.user = user;
    } catch (e: any) {
        if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError') {
            throw new BadTokenError('Bad Token')
        }
    }
}

