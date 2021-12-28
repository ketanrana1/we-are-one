import React from 'react'

const userLogin = () => {
    if(typeof window !== "undefined")
        return sessionStorage.getItem("token")
    
    return false
}

export default userLogin

