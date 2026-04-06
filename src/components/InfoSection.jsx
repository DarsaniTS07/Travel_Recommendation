import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import aero from "../assets/aeroplane.jpg"


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    const GetPlacePhoto = async () => {
      if (!trip?.userSelection?.location?.label) return

      try {
        const data = {
          textQuery: trip.userSelection.location.label
        }
        const result = await GetPlaceDetails(data)
        const photo = result.data?.places?.[0]?.photos?.[0]
        if (photo?.name) {
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photo.name)
          setPhotoUrl(PhotoUrl)
          console.log('Photo loaded successfully:', PhotoUrl)
        }
      } catch (error) {
        console.error('Failed to fetch place photo:', error.message)
      }
    }

    GetPlacePhoto()
  }, [trip?.userSelection?.location?.label])

  return (
    <div className='space-y-5'>
      <div className='rounded-2xl overflow-hidden shadow-xl'>
        <img src={photoUrl? photoUrl : aero} className='h-80 w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300' />
      </div>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex flex-col gap-3 flex-1'>
          <h2 className='font-bold text-3xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex flex-wrap gap-3'>
            <div className='px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold'>📅 {trip?.userSelection?.noOfDays} Days</div>
            <div className='px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold'>💰 {trip?.userSelection?.budget}</div>
            <div className='px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-semibold'>🏞️ {trip?.userSelection?.traveler} Traveler(s)</div>
          </div>
        </div>
        <Button className='bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-full p-3 h-12 w-12 shadow-lg hover:shadow-xl transition-all'> 
          <IoIosSend className='text-xl' /> 
        </Button>
      </div>
    </div>
  )
}

export default InfoSection