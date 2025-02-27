import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AdminNavigation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        
        queryClient.removeQueries({ queryKey: [ 'user' ]} );
        
        navigate('/', { replace: true });
    }

    return (
        <button
            className=" bg-lime-500 hover:bg-lime-400 transition-colors p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={ logout }
        >
            Cerrar Sesión
        </button>
    )
}

export default AdminNavigation;