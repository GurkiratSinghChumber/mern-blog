import { Button, Label, TextInput } from 'flowbite-react';
import { Slide } from "react-awesome-reveal";
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className='flex-1'>
          <Link to={"/"} className=' dark:text-white font-bold text-4xl'>
            <span className='px-2 py-1 pb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>MernStack</span>Blog
          </Link>
          <Slide>
            <p className='text-sm mt-5'>Welcome to my blog page. Feel free to sign-up and get imersive experience learning all new technologies</p>
          </Slide>
          
        </div>

        {/* right */}
        <div className="flex-1"> 
          <form className="flex flex-col gap-4">
            <div >
              <Label value={'Your Username'}></Label>
              <TextInput type="text" placeholder="Username" id="username"></TextInput>
            </div>
            <div >
              <Label value={'Your Email'}></Label>
              <TextInput type="text" placeholder="Email" id="email"></TextInput>
            </div>
            <div >
              <Label value={'Your Password'}></Label>
              <TextInput type="text" placeholder="Password" id="password"></TextInput>
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account ? </span>
            <Link to={'sign-in'} className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
