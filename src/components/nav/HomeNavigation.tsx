import { Link } from "react-router-dom"

const HomeNavigation = () => {
    return (
        <>
            <Link 
                to='/auth/login' 
                className="text-white p-2 uppercase text-xs cursor-pointer font-black hover:text-lime-500 transition-colors"
            >Inicar Sesión</Link>
            
            <Link 
                to='/auth/register' 
                className="p-2 uppercase text-xs cursor-pointer font-black bg-lime-500 text-slate-800 rounded hover:bg-lime-400 transition-colors"
            >Registrarme</Link>
        </>


    )
}

export default HomeNavigation