import React, { createContext, useEffect, useState } from 'react'



export const tokenContext = createContext()

export default function AuthContextProvider({children}) {
  

 const [token, setToken] = useState(null)

 useEffect(()=>{
  const val = localStorage.getItem('tkn')
   if (val) {
    setToken(val)
   }
 },[])
  return <tokenContext.Provider value={{token , setToken}}>
  {children}
  </tokenContext.Provider>
}
