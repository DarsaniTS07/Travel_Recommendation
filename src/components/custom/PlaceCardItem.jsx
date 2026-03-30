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
    <div className='border rounded-xl p-3 mt-2 flex gap-5'>
        <img src={photoUrl? photoUrl : place.placeImageUrl} className='w-33.5 h-32.5 rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='mt-2'>🕙 {place.timeToTravel}</h2>
            <div className='flex gap-2 items-center mt-2'>
              <span className='text-yellow-500'>⭐ {place.rating}</span>
              <Button className='gap-2'><FaMapLocationDot /> View Map</Button>
            </div>
        </div>
    </div>
  )
}

export default PlaceCardItem