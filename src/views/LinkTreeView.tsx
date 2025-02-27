import { ChangeEvent, useEffect, useState } from "react"
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { SocialNetwork, User } from "../types";
import { isValidUrl } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { toast } from "sonner";

const LinkTreeView = () => {
    const [ devTreeLinks, setDevTreeLinks ] = useState(social);

    const queryClient = useQueryClient();
    
    const user: User = queryClient.getQueryData([ 'user' ])!; 
    const links: SocialNetwork[] = JSON.parse(user.links);
    
    useEffect(() => {
        if(!links) return;
        
        const updatedData = devTreeLinks.map(item => {
            const userLink = links.find((link) => link.name === item.name);

            if(userLink) return { ...item, url: userLink.url, enabled: userLink.enabled, isValidUrl: userLink.isValidUrl }

            return item;
        });

        setDevTreeLinks(updatedData);
    }, []);

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedDevTreeLinks = devTreeLinks.map(link => link.name === e.target.id ?  { ...link, url: e.target.value, isValidUrl: isValidUrl(e.target.value) } : link);
        
        setDevTreeLinks(updatedDevTreeLinks);
    }
    
    const handleEnabledChange = (socialNetwork: SocialNetwork['name']) => {
        const updatedDevTreeLinks = devTreeLinks.map(link => link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link);

        setDevTreeLinks(updatedDevTreeLinks);

        let updatedItems: SocialNetwork[] = [];

        const selectSocialNetwork = updatedDevTreeLinks.find(link => link.name === socialNetwork);

        if(!selectSocialNetwork) return toast.error('Ocurrio un error');
            
        if(selectSocialNetwork.enabled) {
            const itemExists = links.some(link => link.name === socialNetwork);

            const id = links.filter(link => link.id > 0).length + 1;

            if(itemExists) {
                updatedItems = links.map(link => link.name === socialNetwork ? { ...link, enabled: true, id, url: selectSocialNetwork.url } : link);
            }  else {
                const newtItem = {
                    ...selectSocialNetwork,
                    id,
                }

                updatedItems = [ ...links, newtItem ];
            }
        } else {
            const socialNetworkToUpdate = links.find(link => link.name === socialNetwork)?.id!;

            updatedItems = links.map(link => {
                if(link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if(link.id > socialNetworkToUpdate) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link;
                }
            });
        }
        
        queryClient.setQueryData([ 'user' ], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        });

        mutate({ ...user, links: JSON.stringify(updatedItems) });
    }

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: error => toast.error(error.message),
        onSuccess: () => toast.success('Actualizado correctamente') 
    });

    return (
        <div className="space-y-5">
            { 
                devTreeLinks.map(item => 
                    <DevTreeInput 
                        key={ item.name } 
                        item={ item } 
                        handleUrlChange={ handleUrlChange }
                        handleEnabledChange={ handleEnabledChange }
                    /> 
                ) 
            }
        </div>
    )
}

export default LinkTreeView;