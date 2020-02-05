import React, { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData)

  const setAuthUser = userInfo => setUser(userInfo)

  return (
    <AuthContext.Provider value={{ user, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
