
import useRegisterModal from '@/hooks/useRegisterModal';
import { useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function RegisterModal() {
  const RegisterModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const onToggle = useCallback(()=>{
    if(isLoading){
        return
    }
    RegisterModal.onClose();
    loginModal.onOpen();
 },[isLoading, RegisterModal, loginModal]);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/register',{
        email,
        password,
        username,
        name
      })
      toast.success('Account created.');
      signIn('credentials',{
        email,
        password
      });
      RegisterModal.onClose();
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false);
    }
  }, [RegisterModal, email,password,username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account? 
        <span 
        onClick={onToggle}
          className="
                text-white
                cursor-pointer
                hover:underline"
        > Sign in
        </span>
      </p>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title="Create an account"
        actionLable="Register"
        onClose={RegisterModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
}
