import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react"
import slugify from "react-slugify";
import { searchByHandle } from "../api/DevTreeAPI";
import Message from "./Message";
import SpinnerLoading from "./SpinnerLoading";
import { Link } from "react-router-dom";

const SearchForm = () => {
    const [ handle, setHandle ] = useState('');
    
    const mutation = useMutation({ mutationFn: searchByHandle });

    useEffect(() => {
        mutation.reset();
    }, [ handle ]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const slug = slugify(handle, { delimiter: '_'} );

        setHandle(slug);

        mutation.mutate(slug);
    }

    return (
        <form
            onSubmit={ handleSearch }
            className="space-y-5">
            <div className="relative flex items-center bg-white pl-2">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 py-3 focus:ring-0 flex-1 outline-slate-400"
                    placeholder="elonmusk, zuck, jeffbezos"
                    onChange={ e => setHandle(e.target.value) }
                    value={ handle }
                />
            </div>

            { mutation.isPending && <SpinnerLoading /> }
            
            { mutation.error && <Message status="error">{ mutation.error.message }</Message> }
            
            { mutation.data && 
                <div className="flex justify-between gap-5 bg-green-100">
                    <Message status="success">{ mutation.data }</Message>
                    <Link 
                        to='/auth/register'
                        className="bg-green-700 px-4 py-2 text-sm flex items-center rounded text-white font-bold uppercase"
                        state={ { handle } }
                    >Ir a Registro</Link> 
                </div>
            }

            <input
                type="submit"
                className="bg-cyan-400 p-3 w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                value='Obtener mi DevTree'
                disabled={ !handle }
            />
        </form>
    )
}

export default SearchForm