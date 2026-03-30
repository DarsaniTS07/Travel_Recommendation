import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import aero from '../../assets/aeroplane.jpg'

const HotelCardItem = ({ hotel }) => {

    const [photoUrl, setPhotoUrl] = useState()
    
      useEffect(() => {
        const GetPlacePhoto = async () => {
    
          try {
            const data = {
              textQuery: hotel?.hotelName
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
      }, [hotel])



    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=lumen+field' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl? photoUrl : aero} className='rounded-xl h-45 w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='text-sm '>💵 {hotel?.price}</h2>
                    <h2 className='text-sm '>⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem