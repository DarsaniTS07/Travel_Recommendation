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
    <div>
      <img src={photoUrl? photoUrl : aero} className='h-[340px] w-full object-cover rounded-xl' />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 📅{trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰Budget : {trip?.userSelection?.budget} </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🏞️No. of Traveller : {trip?.userSelection?.traveler} </h2>
          </div>
        </div>
        <Button> <IoIosSend /> </Button>
      </div>
    </div>
  )
}

export default InfoSection