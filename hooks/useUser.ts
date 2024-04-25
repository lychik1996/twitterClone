import useSWR from'swr';

import fetcher from '@/libs/fetcher';

const useUser =(userID:string)=>{
    const {data,error, isLoading, mutate} = useSWR(userID? `/api/users/${userID}`:null,fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUser;