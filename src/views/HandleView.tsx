import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";
import { DevTreeLink, SocialNetwork } from "../types";
import SpinnerLoading from "../components/SpinnerLoading";
import { useEffect, useState } from "react";

const HandleView = () => {
    const params = useParams();

    const handle = params.handle!;

    const [ enabledLinks, setEnabledLinks ] = useState<DevTreeLink[]>([]);  

    const { data, isLoading, isError } = useQuery({
        queryKey: [ 'handle', handle ],
        queryFn: () => getUserByHandle(handle),
        refetchOnWindowFocus: true,
        retry: 1
    });

    useEffect(() => {
        if(data) {
            const links: SocialNetwork[] = JSON.parse(data.links || '').filter((link: SocialNetwork)  => link.enabled);

            setEnabledLinks(links);
        }
    }, [ data ]);
    
    if(isLoading) return <SpinnerLoading />;

    if(isError) return <Navigate to='/404' />;

    if(data) return (
        <div className="space-y-6 text-white animate__animate animate__fadeiN">
            { data.image && 
                <div className="rounded-full overflow-hidden mx-auto w-40 h-40 bg-white border-white border-3">
                    <img src={ data.image } alt='Imagen Handle' /> 
                </div>
            }
            <p className="text-4xl text-center font-black tracking-wide">{ data.handle }</p>
            <p className="font-normal text-center text-slate-200 tracking-wider leading-relaxed">{ data.description }</p>
            <div className="mt-15 flex flex-wrap justify-center gap-10">
                {
                    enabledLinks.length > 0 ? 
                        enabledLinks.map(link => (
                            <a 
                                key={ link.name }
                                className="bg-white px-3 py-2 flex items-center text-center gap-5 rounded-lg hover:bg-gray-200 transition-colors"
                                href={ link.url } 
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img 
                                    className='w-12 h-12 bg-cover'
                                    src={`/social/icon_${link.name}.svg` }
                                />
                            </a>

                        ))
                    : <p className="text-center animate">No hay enlaces en este perfil</p>
                }
            </div>
        </div>
    );
}

export default HandleView