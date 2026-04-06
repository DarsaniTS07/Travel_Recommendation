import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';


const PlaceCardItem = ({place}) => {
  
  const [photoUrl, setPhotoUrl] = useState()
      
        useEffect(() => {
          const GetPlacePhoto = async () => {
      
            try {
              const data = {
                textQuery: place.placeName
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
        }, [place])
  

  return (
    <div className='border border-gray-200 rounded-2xl p-5 mt-4 flex gap-5 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
        <img src={photoUrl? photoUrl : place.placeImageUrl} className='w-40 h-40 rounded-xl object-cover shadow-md flex-shrink-0'/>
        <div className='flex-1'>
            <h2 className='font-bold text-lg text-gray-900'>{place.placeName}</h2>
            <p className='text-sm text-gray-600 mt-2 line-clamp-2'>{place.placeDetails}</p>
            <h2 className='mt-3 text-gray-700 font-medium'>🕙 {place.timeToTravel}</h2>
            <div className='flex gap-3 items-center mt-4'>
              <span className='text-yellow-500 font-semibold bg-yellow-50 px-3 py-1 rounded-full text-sm'>⭐ {place.rating}</span>
              <Button className='gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg'><FaMapLocationDot /> View Map</Button>
            </div>
        </div>
    </div>
  )
}

export default PlaceCardItem