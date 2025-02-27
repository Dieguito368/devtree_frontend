import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Message from "../components/Message";
import api from "../lib/axios";
import type { UserRegistrationForm } from "../types";
import { useState } from "react";
import { isAxiosError } from "axios";

const RegisterView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [ message, setMessage ] = useState<{ status: "success" | "error"; text: string } | null>(null);

    const intialsValues: UserRegistrationForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: intialsValues });

    const password = watch('password');

    const handleRegister = async (formData: UserRegistrationForm) => {
        try {
            const { data } = await api.post('/auth/register', formData);

            reset();

            window.scrollTo({ top: 0, behavior: "smooth" });

            setMessage({ status: "success", text: data });

            setTimeout(() => {
                setMessage(null);

                navigate('/auth/login', { replace: true });
            }, 3000);
        } catch (error) {
            if(isAxiosError(error) && error.response) {
                window.scrollTo({ top: 0, behavior: "smooth" });

                setMessage({ status: "error", text: error.response.data.error });
            }
        } 
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

            <form 
                onSubmit={ handleSubmit(handleRegister) }
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
            >
                { message && <Message status={ message.status }>{ message.text }</Message> }

                <div className="grid grid-cols-1">
                    <label htmlFor="name" className="font-semibold text-slate-500 mb-3">Nombre</label>
                    
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className={ `${errors.name ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm` }
                        { ...register('name', { required: 'Es necesario que ingreses tu nombre' }) }
                    />

                    { errors.name && <Message status="error">{ errors.name.message }</Message> }

                </div>

                <div className="grid grid-cols-1">
                    <label htmlFor="email" className="font-semibold text-slate-500 mb-3">E-mail</label>
                    
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className={ `${errors.email ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm` }
                        { 
                            ...register('email', { 
                                required: 'Es necesario que ingreses tu email', 
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                }
                            })
                        }
                    />

                    { errors.email && <Message status="error">{ errors.email.message }</Message> }
                </div>
                
                <div className="grid grid-cols-1">
                    <label htmlFor="handle" className="font-semibold text-slate-500 mb-3">Handle</label>
                   
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className={ `${errors.handle ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                        { ...register('handle', { required: 'Es necesario que ingreses tu handle' }) }
                    />

                    { errors.handle && <Message status="error">{ errors.handle.message }</Message> }
                </div>

                <div className="grid grid-cols-1">
                    <label htmlFor="password" className="font-semibold text-slate-500 mb-3">Password</label>
                    
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={ `${errors.password ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                        { 
                            ...register('password', { 
                                required: 'Es necesario que ingreses tu password', 
                                minLength: {
                                    value: 8,
                                    message: 'El password es muy corto, debe contener al menos 8 caracteres'
                                },
                            })
                        }
                    />

                    { errors.password && <Message status="error">{ errors.password.message }</Message> }
                </div>

                <div className="grid grid-cols-1">
                    <label htmlFor="password_confirmation" className="font-semibold text-slate-500 mb-3">Repetir Password</label>
                    
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className={ `${errors.password_confirmation ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                        { 
                            ...register('password_confirmation', { 
                                required: 'Es necesario que ingreses tu password de nuevo', 
                                validate: value => value === password || 'Los passwords no son iguales'
                            }) 
                        }
                    />

                    { errors.password_confirmation && <Message status="error">{ errors.password_confirmation.message }</Message> }
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 hover:bg-cyan-500 transition-colors p-3 w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />  
            </form>

            <nav className="mt-10">
                <p className="text-white text-center block">
                    ¿Ya tienes una cuenta? { }
                    
                    <Link 
                        to='/auth/login'
                        className="text-cyan-400 font-bold hover:underline text-lg"
                    >Inicia sesión</Link>
                </p>
            </nav>
        </div>
    )
}

export default RegisterView;