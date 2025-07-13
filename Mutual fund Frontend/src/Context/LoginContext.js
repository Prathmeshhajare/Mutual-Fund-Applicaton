
import React, { createContext, useState } from 'react'

export  const LoginContext = createContext()
 export function LoginProvider(props)
  {
    let [isLogin,setIsLogin]=useState(false)
    let[isAdmin,setIsAdmin]=useState(false)
    let [userId,setUserId]=useState(null)
     let [userName,setUserName]=useState(null)
     let[searchFund,setSearchFund]=useState("")
   return(
    <LoginContext.Provider value={{isLogin,setIsLogin,userId,setUserId,isAdmin,setIsAdmin,userName,setUserName,searchFund,setSearchFund}}>
        {props.children}
    </LoginContext.Provider>
   )
}

