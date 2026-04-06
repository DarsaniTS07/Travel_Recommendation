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
            <div className='hover:scale-105 transition-all duration-300 cursor-pointer group'>
                <div className='rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'>
                  <img src={photoUrl? photoUrl : aero} className='rounded-xl h-48 w-full object-cover group-hover:brightness-95 transition-all duration-300' />
                </div>
                <div className='my-3 flex flex-col gap-2'>
                    <h2 className='font-bold text-gray-900 text-lg'>{hotel?.hotelName}</h2>
                    <h2 className='text-sm text-gray-600'>📍 {hotel?.hotelAddress}</h2>
                    <div className='flex justify-between items-center pt-1'>
                      <h2 className='text-sm font-semibold text-green-600'>💵 {hotel?.price}</h2>
                      <h2 className='text-sm font-semibold bg-yellow-50 px-2 py-1 rounded-full'>⭐ {hotel?.rating}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem