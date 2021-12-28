

const adminLogin = () => {
    if(typeof window !== "undefined")
        return sessionStorage.getItem("token") && sessionStorage.getItem("role") === "admin"
    
    return false
}

export default adminLogin    
  