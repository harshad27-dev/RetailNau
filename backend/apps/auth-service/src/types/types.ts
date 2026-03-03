export interface JwtPayload {
    userId: string;
    mobile: string;
    role: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    isNewUser: boolean;
    user: {
        id: string;
        mobile: string;
        role: string;
    };
    tokens: AuthTokens;
}
