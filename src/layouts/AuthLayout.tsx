import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Spinner from "../components/Spinner";
import Logo from "../components/Logo";
import { getUser } from "../api/DevTreeAPI";
import 'animate.css';

const AuthLayout = () => {
    const [ animation, setAnimation ] = useState('animate__animated animate__fadeIn');
    
    const { data: user, isLoading, isError } = useQuery({
        queryKey: [ 'user' ], 
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: true
    });

    useEffect(() => {
        setTimeout(() => {
            setAnimation('');
        }, 1000);
    }, []);

    if(isLoading) return <Spinner />

    if(user) return <Navigate to='/admin' replace={ true } />

    if(isError) return (
        <div className={ `${animation} bg-slate-800 min-h-screen` }>
            <div className="max-w-lg mx-auto pt-10 px-5">
                <Logo />
            
                <div className="py-10">
                    <Outlet />
                </div>
            </div>

            <Toaster />
        </div>

    );
}

export default AuthLayout