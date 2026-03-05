import React from 'react'
import aero_img from '../../assets/aeroplane.jpg'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../ui/button';


const PlaceCardItem = ({place}) => {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5'>
        <img src={place.placeImageUrl || aero_img} className='w-[130px] h-[130px] rounded-xl object-cover'/>
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