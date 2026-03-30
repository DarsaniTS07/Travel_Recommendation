import React, { useEffect, useState } from 'react'
import aero from "../../assets/aeroplane.jpg"
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Link } from 'react-router-dom'

const UserTripCardItem = ({ trip }) => {

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
    <Link to={'/view-trip/' + trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl? photoUrl : aero} 
        className='object-cover rounded-xl h-[220px]' />
      <div>
        <h2 className='font-bold text-lg'>
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem