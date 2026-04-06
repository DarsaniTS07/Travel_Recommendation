/* eslint-disable no-unused-vars */
import React from 'react'
import HotelCardItem from './custom/HotelCardItem'


const Hotels = ({trip}) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='font-bold text-3xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>🏨 Hotel Recommendations</h2>
        <p className='text-gray-600'>Choose from our curated selection of hotels</p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel}/>
        ))}
      </div>
    </div>
  )
}

export default Hotels