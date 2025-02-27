import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner";
import Logo from "../components/Logo";
import 'animate.css';

const AuthLayout = () => {
    const [ animation, setAnimation ] = useState('animate__animated animate__fadeIn');
    
    useEffect(() => {
        setTimeout(() => {
            setAnimation('');
        }, 1000);
    }, []);

    return (
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