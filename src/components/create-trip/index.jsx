import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import logo from "/src/assets/logoipsum-365.svg"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { getAuth} from 'firebase/auth';
import { app } from '@/service/firebaseConfig';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setloading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onerror: (error) => console.log(error)
    })

    const onGenearteTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }
        if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast("Please fill all fields")
            return;
        }
        setloading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log("--", result?.response?.text());
        setloading(false);
        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip = async (TripData) => {
        try {
            setloading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const docId = Date.now().toString();
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docId
            });
            toast.success("Trip saved successfully!");
            setloading(false);
        } catch (error) {
            console.error("Error saving trip:", error);
            toast.error("Failed to save trip: " + error.message);
            setloading(false);
        }
    }

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
                const auth = getAuth(app);
                
                // Store the token for verification in Firestore
                localStorage.setItem('googleAccessToken', tokenInfo?.access_token);
                
                setOpenDialog(false);
                onGenearteTrip();
            }).catch((err) => {
                console.error('Error fetching user profile:', err);
                toast.error("Failed to sign in. Please try again.");
            })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20 flex flex-col gap-5'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your Destination of Choice?</h2>
                    <GooglePlacesAutocomplete
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input
                        placeholder={"Ex.3"}
                        type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <p className='text-gray-500 text-sm'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on ravelling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelesList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{item.icons}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <p className='text-gray-500 text-sm'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-end my-10'>
                <Button
                    disabled={loading}
                    onClick={onGenearteTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
                        'Generate Trip'}
                </Button>
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

export default CreateTrip