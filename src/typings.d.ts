type authTokenType = string | null

declare interface TokenInterface {
  authToken: authTokenType
  expireAt: Date | null
  authState: object | null
}
