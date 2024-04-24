
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";

export default function LoginModal(){
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [isLoading,setIsLoading]=useState(false);

    const onToggle = useCallback(()=>{
        if(isLoading){
            return
        }
        loginModal.onClose();
        RegisterModal.onOpen();
     },[isLoading, RegisterModal, loginModal]);

    const onSubmit= useCallback(async()=>{
        try{
            setIsLoading(true);
            await signIn('credentials',{
                email,
                password
            })
            loginModal.onClose();
        }catch(e){
            console.log(e);
            
        }finally{
            setIsLoading(false)
        }
    },[loginModal,email, password]);

    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Input placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            value={email}
            disabled={isLoading}/>
            <Input placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            value={password}
            disabled={isLoading}/>
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
          <p>
            First time using Twitter? 
            <span 
            onClick={onToggle}
              className="
                    text-white
                    cursor-pointer
                    hover:underline"
            > Create an account
            </span>
          </p>
        </div>
      );
    return(
        <>
        <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLable="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
        </>
    )
}