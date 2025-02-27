import { useForm } from "react-hook-form";
import Message from "../components/Message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserProfileFormData } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import { ChangeEvent } from "react";

function ProfileView() {
    const queryClient = useQueryClient();

    const user : User = queryClient.getQueryData([ 'user' ])!;
    
    const initialValues: UserProfileFormData = {
        handle: user.handle,
        description: user.description
    }
    
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const updateProfileMutation  = useMutation({
        mutationFn: updateProfile,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            
            toast.success(data);
        }
    })

    const uploadImageMutation  = useMutation({
        mutationFn: uploadImage,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            queryClient.setQueryData([ 'user' ], (prevData: User) => {
                return { ...prevData, image: data }
            });
        }
    });

    const handleUpdateProfile = (formData: UserProfileFormData) => {
        const user: User = queryClient.getQueryData([ 'user' ])!;
        user.description = formData.description;
        user.handle = formData.handle;

        updateProfileMutation.mutate(user);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) uploadImageMutation.mutate(e.target.files[0])
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5 animate__animated animate__fadeIn"
            onSubmit={ handleSubmit(handleUpdateProfile) }
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>

            <div className="grid grid-cols-1">
                <label htmlFor="handle" className="mb-3">Handle:</label>

                <input
                    type="text"
                    className={ `${errors.handle ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                    placeholder="handle o Nombre de Usuario"
                    { ...register('handle', { required: 'Es necesario que ingreses tu handle' }) }
                />

                { errors.handle && <Message status="error">{ errors.handle.message }</Message> }
            </div>

            <div className="grid grid-cols-1">
                <label htmlFor="description" className="mb-3">Descripción:</label>
                
                <textarea
                    className={ `${errors.description ? 'border-red-700 outline-none' : 'border-slate-200 outline-slate-400'} bg-slate-100 p-3 border-2 rounded placeholder-slate-400 text-sm ` }
                    placeholder="Tu Descripción"
                    { ...register('description', { required: 'Es necesario que ingreses tu descripción' }) }
                />

                { errors.description && <Message status="error">{ errors.description.message }</Message> }
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 mt-5 p-3 text-sm w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}

export default ProfileView;