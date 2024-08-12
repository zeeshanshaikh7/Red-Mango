import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { SD_Roles } from "../Utilities/SD";
import { Navigate } from "react-router-dom";
import { MainLoader } from "../components/pages/common";

const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

        useEffect(() => {
            const accessTokens = localStorage.getItem('token') ?? "";
            
            if (!accessTokens) {
                setIsAuthenticated(false);
            } else {
                try {
                    const decoded: { role: string } = jwtDecode(accessTokens);
                    
                    if (decoded.role === SD_Roles.ADMIN) {
                        setIsAuthenticated(true);
                        setIsAdmin(true);
                    } else {
                        setIsAuthenticated(true);
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    setIsAuthenticated(false);
                }
            }
        }, []);

        if (isAuthenticated === null) {
            return <MainLoader/>;
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        if (!isAdmin) {
            return <Navigate to="/accessDenied" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAdminAuth;
