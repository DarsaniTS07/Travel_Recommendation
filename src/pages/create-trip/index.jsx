import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList, AgeGroups } from '../../components/constants/options';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import logo from "/src/assets/logoipsum-365.svg"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { getAuth} from 'firebase/auth';
import { app } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setloading] = useState(false);
    const [selectedAges, setSelectedAges] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleAgeSelection = (ageGroup) => {
        setSelectedAges(prevAges => {
            if (prevAges.includes(ageGroup.value)) {
                return prevAges.filter(age => age !== ageGroup.value);
            } else {
                return [...prevAges, ageGroup.value];
            }
        });
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
        if (selectedAges.length === 0) {
            toast("Please select at least one age group")
            return;
        }
        setloading(true);
        const agesString = selectedAges.join(', ');
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{ages}', agesString)
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
                userSelection: { ...formData, ages: selectedAges },
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docId
            });
            toast.success("Trip saved successfully!");
            setloading(false);
            navigate('/view-trip/'+ docId)
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
                // eslint-disable-next-line no-unused-vars
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
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 py-10'>
            <div className='space-y-4 mb-10'>
              <h2 className='font-bold text-4xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>Tell us your travel preferences</h2>
              <p className='text-gray-600 text-lg'>Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.</p>
            </div>
            
            <div className='mt-10 flex flex-col gap-8 bg-white p-8 rounded-2xl shadow-lg'>
                <div className='space-y-3'>
                    <h2 className='text-xl font-bold text-gray-900'>🗺️ What is your Destination of Choice?</h2>
                    <GooglePlacesAutocomplete
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                        }}
                    />
                </div>
                
                <div className='space-y-3'>
                    <h2 className='text-xl font-bold text-gray-900'>📅 How many days are you planning your trip?</h2>
                    <Input
                        placeholder={"Ex. 3"}
                        type="number"
                        className='text-lg p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                </div>
                
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold text-gray-900'>💰 What is your Budget?</h2>
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-5 border-2 rounded-xl hover:shadow-xl cursor-pointer transition-all duration-300 ${formData?.budget == item.title ? 'shadow-xl border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <h2 className='text-4xl mb-2'>{item.icon}</h2>
                                <h2 className='font-bold text-lg text-gray-900'>{item.title}</h2>
                                <p className='text-gray-600 text-sm mt-1'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold text-gray-900'>🧑‍🤝‍🧑 What age groups are in your family?</h2>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                        {AgeGroups.map((ageGroup, index) => (
                            <div key={index}
                                onClick={() => handleAgeSelection(ageGroup)}
                                className={`p-4 border-2 rounded-lg hover:shadow-lg cursor-pointer transition-all duration-300 ${selectedAges.includes(ageGroup.value) ? 'shadow-lg border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <h2 className='font-bold text-sm text-gray-900'>{ageGroup.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold text-gray-900'>👥 Who do you plan on travelling with?</h2>
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        {SelectTravelesList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-5 border-2 rounded-xl hover:shadow-xl cursor-pointer transition-all duration-300 ${formData?.traveler == item.people ? 'shadow-xl border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <h2 className='text-4xl mb-2'>{item.icons}</h2>
                                <h2 className='font-bold text-lg text-gray-900'>{item.title}</h2>
                                <p className='text-gray-600 text-sm mt-1'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className='flex justify-end my-10'>
                <Button
                    onClick={onGenearteTrip}
                    disabled={loading}
                    className='bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50'>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-6 w-6 animate-spin' /> :
                        'Generate Trip 🚀'}
                </Button>
            </div>
            
            <Dialog open={openDialog}>
                <DialogContent className='rounded-2xl'>
                    <DialogHeader>
                        <div className='flex flex-col items-center gap-3'>
                            <img src={logo} className='w-16 h-16' />
                            <DialogTitle className='text-2xl font-bold'>Sign In with Google</DialogTitle>
                        </div>
                        <DialogDescription className='text-gray-600'>
                            Sign in to the App with google authentication securely
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={login}
                        className="w-full mt-5 flex gap-4 items-center justify-center bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-300"
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