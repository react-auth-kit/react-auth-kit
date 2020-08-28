import React from 'react'

declare interface ContextProps {
  authState: TokenInterface
  setAuthState: React.Dispatch<React.SetStateAction<TokenInterface>>
}

const Auth = React.createContext<ContextProps | null>(null)

export const AuthContextProvider = Auth.Provider
export const AuthContextConsumer = Auth.Consumer
export const AuthContext = Auth
