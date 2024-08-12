// import { useEffect, useState } from "react"
// import { MainLoader } from "../components/pages/common";

const withAuth = (WrappedComponent:any) => {
    
    return (props:any) => {
        const accessTokens = localStorage.getItem('token') ?? "";
        // const accessTokens = localStorage.getItem('token')
        if(!accessTokens) {
            window.location.replace("/login")
            return null;
        }
        return <WrappedComponent {...props} />
    }
}

export default withAuth