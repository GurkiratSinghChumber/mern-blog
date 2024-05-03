import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import app from '../firebase';
export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState('');
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState('');
    const filePickerRef = useRef();
    const handleChange = (e) => { 
        const file = e.target.files[0];
        if (file) { 
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }

    }
    useEffect(() => { 
        if (imageFile) { 
            uploadImage();
        }

    }, [imageFile])
    
    const uploadImage = async() => { 
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        setImageFileUploadError('');
        uploadTask.on(
            'state_changed',
            (snapshot) => { 
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0)); //toFixed(0) will leave no decimal places
            },(error) => { 
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        }, () => { 
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 

                    setImageFileUrl(downloadURL);
                })
        }
        )
    }
    
  return (
      <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
         
          <form className='flex flex-col gap-4'>
              <input type="file" accept='image/*' onChange={handleChange
              } ref={filePickerRef} className=' hidden'/>
<div className='w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full relative' onClick={() => filePickerRef.current.click()}>
    {imageUploadProgress && (
        <CircularProgressbar 
            value={imageUploadProgress} 
            text={`${imageUploadProgress}%`} 
            strokeWidth={5} 
            styles={{ 
                root: {
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    top:0,
                    bottom: 0,
                    zIndex:20,
                },
                path: {
                    // Path color
                    stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                }
            }}
        />
    )}

    <img 
        src={imageFileUrl || currentUser.profilePicture} 
        alt="user" 
        className={` z-10 absolute top-0 bottom-0 rounded-full w-full h-full border-8 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`}   
    />
</div>

              {imageFileUploadError && <Alert color='failure'>{ imageFileUploadError}</Alert>}
              <TextInput type ='text' id='username' placeholder='username' defaultValue={currentUser.username}></TextInput>
              <TextInput type ='email' id='email' placeholder='name@gmail.com' defaultValue={currentUser.email}></TextInput>
              <TextInput type='password' id='password' placeholder='********' ></TextInput>
              <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                  Update
              </Button>
          </form>
          
          <div className='text-red-500 flex justify-between mt-5'>
              <span className='cursor-pointer'>Delete Account</span>
              <span className='cursor-pointer'>Sign Out</span>
          </div>
    </div>
  )
}
