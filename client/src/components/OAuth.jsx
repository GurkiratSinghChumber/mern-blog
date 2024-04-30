import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import app from '../firebase.js';
import { signInSuccess } from '../redux/user/userSlice';


export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => { 
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });// once signend in using google it will prompt again if the user wants to signin with different google id
        try { 
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    photoUrl: resultsFromGoogle.user.photoURL,
                })
            })

            const data = await res.json()
            if (res.ok) { 
                dispatch(signInSuccess(data));
                navigate('/');
            }

        } catch (error) {
            console.log(error);
         }
    }
  return (
      <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
          <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
          <p  className='flex items-center'>Continue with Google</p>
    </Button>
  )
}
