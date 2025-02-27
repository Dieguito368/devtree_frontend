import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Message from "../components/Message";
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserLoginFormData } from "../types";

const LoginView = () => {
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const navigate = useNavigate();
    
    const initialValues: UserLoginFormData = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleLogin = async (formData: UserLoginFormData) => {
        try {
            const { data } = await api.post('/auth/login', formData);

            localStorage.setItem('AUTH_TOKEN', data);

            navigate('/admin', { replace: true });
        } catch (error) {
            if(isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.error);
            }
        }
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="text-4xl text-white font-bold">Inicar Sesión</h1>

            <form 
                onSubmit={ handleSubmit(handleLogin) }
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
                noValidate
            >
                { errorMessage && <Message status="error">{ errorMessage }</Message> }

                <div className="grid grid-cols-1">
                    <label htmlFor="email" className="font-semibold text-slate-500 mb-3">E-mail</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className={ `${errors.email ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }

                        {
                            ...register("email", {
                                required: 'Es necesario que ingreses tu email', 
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })
                        }
                    />

                    { errors.email && <Message status="error">{errors.email.message}</Message> }
                </div>
                
                <div className="grid grid-cols-1">
                    <label htmlFor="password" className="font-semibold text-slate-500 mb-3">Password</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={ `${errors.password ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                        {...register("password", {
                            required: 'Es necesario que ingreses tu password', 
                        })}
                    />

                    { errors.password && <Message status="error">{ errors.password.message }</Message> }
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 hover:bg-cyan-500 transition-colors p-3 w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>

            <nav className="mt-10">
                <p className="text-white text-center block">
                    ¿Aún no tienes una cuenta? { }
                    
                    <Link 
                        to='/auth/register'
                        className="text-cyan-400 font-bold hover:underline text-lg"
                    >Crea una aquí</Link>
                </p>
            </nav>
        </div>
    )
}

export default LoginView;