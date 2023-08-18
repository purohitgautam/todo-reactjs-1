import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()



const AppProvider = ({children})=>{

    const [apprender, setApprender] = useState(false)

  return (
  <AppContext.Provider value={{setApprender}}>
      {children}
  </AppContext.Provider>
  )
}

const useProductContext = ()=>{

  return useContext(AppContext)
}
export {AppProvider, useProductContext, AppContext}