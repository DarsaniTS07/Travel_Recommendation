import React, { useEffect, useState } from 'react'
import logo from '../../assets/logoipsum-365.svg'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { toast } from 'sonner'
import { app } from '@/service/firebaseConfig'
import { FcGoogle } from 'react-icons/fc'

const Header = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [openDialog, setOpenDialog] = useState(false);
  

  useEffect(() => {
    console.log(user);
  }, [])

   const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onerror: (error) => console.log(error)
    })

     const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'Application/json',
                }
            }).then((resp) => {
                console.log(resp);
                const userInfo = resp.data;
                localStorage.setItem('user', JSON.stringify(userInfo));
                
                // Create custom token via backend to authenticate with Firebase
                // For now, we'll use the Google idToken with Firebase
                // eslint-disable-next-line no-unused-vars
                const auth = getAuth(app);
                
                // Store the token for verification in Firestore
                localStorage.setItem('googleAccessToken', tokenInfo?.access_token);
                
                setOpenDialog(false);
                window.location.reload();
            }).catch((err) => {
                console.error('Error fetching user profile:', err);
                toast.error("Failed to sign in. Please try again.");
            })
    }


  return (
    <div className='w-full p-3 shadow-sm flex justify-between items-center px-5'>
      <img src={logo} alt="Logo" />
      <div>
        {user ?
          <div className="flex gap-3 items-center">
            <a href='/create-trip'>            
            <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>            
            <Button variant="outline" className="rounded-full">My trips</Button>
            </a>
            
            <Popover>
              <PopoverTrigger>
                <img
              src={user?.picture}
              alt="User profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
              onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Ccircle cx="20" cy="20" r="20" fill="%23e5e7eb"/%3E%3Ccircle cx="20" cy="12" r="5" fill="%236b7280"/%3E%3Cpath d="M 10 28 Q 10 20 20 20 Q 30 20 30 28" fill="%236b7280"/%3E%3C/svg%3E' }}
            />
              </PopoverTrigger>
              <PopoverContent>
             <h2 className='cursor-pointer' onClick={() => {
              googleLogout();
              localStorage.clear();
              window.location.reload();
             }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
          : <Button onClick={() => {setOpenDialog(true)}}>
            Sign In
          </Button>
        }

      </div>
      <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <div className='flex flex-col items-center gap-2'>
                            <img src={logo} />
                            <DialogTitle className='text-lg'>Sign In with Google</DialogTitle>
                        </div>
                        <DialogDescription>
                            Sign in to the App with google authentication securely
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={login}
                        className="w-full mt-5 flex gap-4 items-center justify-center"
                    >
                        <FcGoogle className='h-7 w-7' />
                        Sign in with Google
                    </Button>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default Header