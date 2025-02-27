import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { toast, Toaster } from "sonner";
import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs";
import DevTreeLink from "../components/DevTreeLink";
import Spinner from "../components/Spinner";
import { getUser, updateProfile } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";

export default function AppLayout() {
    const [ enabledLinks, setEnabledLinks ] = useState<SocialNetwork[]>([]);
    const [ animation, setAnimation ] = useState('animate__animated animate__fadeIn');

    useEffect(() => {
        setTimeout(() => {
            setAnimation('');
        }, 1000);
    }, []);

    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: [ 'user' ], 
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: true
    });

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: error => toast.error(error.message),
    });

    useEffect(() => {
        if(!user) return 

        setEnabledLinks(JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled));
    }, [ user ]);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if(!over || !over.id) return;

        const prevIndex = enabledLinks.findIndex(link => link.id === active.id);
        const newIndex = enabledLinks.findIndex(link => link.id === over.id);

        const order = arrayMove(enabledLinks, prevIndex, newIndex);

        setEnabledLinks(order);

        if(!user) return;

        const disabledLinks: SocialNetwork[] = JSON.parse(user.links).filter((link: SocialNetwork) => !link.enabled);

        const links = order.concat(disabledLinks);

        queryClient.setQueryData([ 'user' ], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(links)
            }
        });

        mutate({ ...user, links: JSON.stringify(links) });
    }

    if(isLoading) return <Spinner />

    if(isError) return <Navigate to='/' />

    if(user) return (
        <div className={ animation }>
            <Header />
    
            <div className="bg-gray-100 min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />
                    
                    <div className="flex justify-end">
                        <p className="font-bold text-right text-slate-800 text-xl">
                            Visitar Mi Perfil: { '' }

                            <Link
                                className="text-cyan-400 hover:underline block"
                                to={ `/${user.handle}` }
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                /{ user.handle }
                            </Link>
                        </p>

                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-[400px] bg-slate-800 px-10 py-10 overflow-y-scroll space-y-6 flex flex-col justify-between h-screen">
                            <p className="text-white font-semibold text-3xl text-center">{ user.handle }</p>
                            { user.image && <img src={ user.image} alt="Imagen perfil" className="mx-auto max-w-3xs max-h-60" /> }
                            <p className="text-white font-black text-center">{ user.description }</p>

                            <DndContext
                                collisionDetection={ closestCenter }
                                onDragEnd={ handleDragEnd}
                            >
                                <div className="flex flex-col gap-5">
                                    <SortableContext 
                                        items={ enabledLinks }
                                        strategy={ verticalListSortingStrategy }
                                    >
                                        {

                                            enabledLinks.map(link => (
                                                <DevTreeLink key={ link.name } link={ link } />
                                            ))
                                        }
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>

            <Toaster position="top-right" />
        </div>
    )
}