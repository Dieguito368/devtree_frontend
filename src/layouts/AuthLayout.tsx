import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { Toaster } from "sonner";
import Spinner from "../components/Spinner";
import Logo from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import 'animate.css';

const AuthLayout = () => {
    const [ animation, setAnimation ] = useState('animate__animated animate__fadeIn');
    
    const { user, isLoading, isError } = useAuth();

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

export default AuthLayout;