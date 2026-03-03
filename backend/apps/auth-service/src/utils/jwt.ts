import jwt from "jsonwebtoken";
import { JwtPayload, AuthTokens } from "../types/types";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_dev";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_dev";
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export const generateTokens = (payload: JwtPayload): AuthTokens => {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
    });

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
};
