

import useUser from "./useUser";
import useCurrentUser from "./userCurrentUser"
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId:string)=>{
    const {data:currentUser, mutate:mutateCurrentUser} = useCurrentUser();
    const {data:user,mutate:mutateFetchedUser} = useUser(userId);
    const loginModal = useLoginModal();
    
    
    const isFollowing = useMemo(()=>{
        const list = user?.followerIds || [];
        return list.includes(currentUser?.id);
    },[userId, user?.followerIds,currentUser?.id]);
    
    

    const toggleFollow = useCallback( async()=>{
        if(!currentUser?.id){
            return loginModal.onOpen();
        }
        try{
            let request;
            
            if(isFollowing){
                request = ()=>axios.delete('/api/follow',{data:{userId,currentUser}})
            }else{
                request=()=>axios.post('/api/follow',{userId,currentUser})
            }
            await request();
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Success");
            
            
        }catch(error){
            toast.error('Something went wrong')
        }
    },[isFollowing, userId, mutateCurrentUser,mutateFetchedUser,loginModal,currentUser,user]);

    return{
        isFollowing,
        toggleFollow
    }

}

export default useFollow;