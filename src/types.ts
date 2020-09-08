export declare type authTokenType = string | null

export declare interface TokenInterface {
    authToken: authTokenType
    expireAt: Date | null
    authState: object | null
}
