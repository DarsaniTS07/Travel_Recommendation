import React from 'react'
import PlaceCardItem from './custom/PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  console.log("Trip data:", trip);
  console.log("Itinerary:", trip?.tripData?.itinerary);
  
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {trip?.tripData?.itinerary && trip?.tripData?.itinerary.length > 0 ? (
              trip?.tripData?.itinerary.map((item, dayIndex) => (
                <div key={dayIndex} className='mb-8'> 
                    <h2 className='font-medium text-lg mb-4'>Day {item.day}: {item.theme}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item?.places && item?.places.length > 0 ? (
                      item?.places?.map((place, placeIndex) => (
                        <div key={`${dayIndex}-${placeIndex}`} className=''>
                            <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place}/>                   
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500'>No places available for this day</p>
                    )}
                    </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No itinerary available</p>
            )}
        </div>
    </div>
  )
}

export default PlacesToVisit