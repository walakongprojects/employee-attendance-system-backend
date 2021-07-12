import React, { createContext, useContext } from 'react'

export const AuthContext = createContext({ data: { isAuthenticated: false, user: {} }, setCompanyNames: companyNames => console.warn('no theme providerr')})
export const useAuth = () => useContext(AuthContext)
