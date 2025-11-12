import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuth}) => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{

        if(localStorage.getItem("token")){
            setIsAuth(true);
            if(location.pathname === "/" || 
                location.pathname === "/login" || 
                location.pathname === "/signup"){
                    navigate("/home", {replace : false})
                }
        }

    },[location,navigate,setIsAuth])

    return (
        null
  )
}

export default RefreshHandler