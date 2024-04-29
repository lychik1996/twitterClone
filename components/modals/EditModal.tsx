import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/userCurrentUser"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import useSWR from "swr";
import ImageUpLoad from "../ImageUpload";

export default function EditModal(){
    const {data: currentUser} = useCurrentUser();
    const{mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal =useEditModal();
    const [profileImage, setProfileImage]= useState("");
    const[coverImage, setCoverImage]=useState("");
    const[name, setName]=useState("");
    const[username, setUsername]=useState("");
    const[bio, setBio]=useState("");

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    },[currentUser?.profileImage,currentUser?.coverImage,currentUser?.name,currentUser?.username,currentUser?.bio]);
   
    
    const [isLoading,setIsLoading] = useState(false);

    const onSubmit = useCallback( async ()=>{
        try{
            setIsLoading(true);

            await axios.patch('/api/edit',{
                currentUser,
                username,
                name,
                bio,
                profileImage,
                coverImage
        });
        
            mutateFetchedUser();

            toast.success('Updated');
            editModal.onClose();
        } catch(error){
            toast.error("Something went wrongs")
        } finally{
            setIsLoading(false)
        }
    },[bio,username,bio,name, profileImage,coverImage,editModal,mutateFetchedUser]);

    const bodyContent =(
        <div className="flex flex-col gap-4">
            <ImageUpLoad
            value={profileImage}
            disabled={isLoading}
            onChange={(image)=>setProfileImage(image)}
            label="Upload profile image"/>
            <ImageUpLoad
            value={coverImage}
            disabled={isLoading}
            onChange={(image)=>setCoverImage(image)}
            label="Upload cover image"/>
            <Input 
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            disabled={isLoading}/>
             <Input 
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            disabled={isLoading}/>
             <Input 
            placeholder="Bio"
            onChange={(e)=>setBio(e.target.value)}
            value={bio}
            disabled={isLoading}/>
        </div>
    )
    return(
        <Modal disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit your profile"
        actionLable="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        />
    )
}