import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";

export const useAuth = () => {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: [ 'user' ], 
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: true
    });

    return { user, isLoading, isError }
}