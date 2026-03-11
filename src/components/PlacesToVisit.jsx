import React from 'react'
import PlaceCardItem from './custom/PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  const itinerary = trip?.tripData?.itinerary;
  
  console.log("Full Itinerary Data:", itinerary);
  console.log("Itinerary Length:", itinerary?.length);
  
  if (itinerary?.length > 0) {
    itinerary.forEach((day, idx) => {
      console.log(`Day ${idx + 1} Structure:`, day);
      console.log(`Day ${idx + 1} Places:`, day?.places?.length || 0);
    });
  }
  
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {itinerary && itinerary.length > 0 ? (
              itinerary.map((item, dayIndex) => (
                <div key={dayIndex} className='mb-8'> 
                    <h2 className='font-medium text-lg mb-4'>
                      Day {item.day || dayIndex + 1}: {item.theme || 'Day Plan'}
                    </h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item?.places && item?.places.length > 0 ? (
                      item?.places?.map((place, placeIndex) => (
                        <div key={`${dayIndex}-${placeIndex}`} className=''>
                            <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place}/>                   
                        </div>
                      ))
                    ) : item?.schedule && item?.schedule.length > 0 ? (
                      item?.schedule?.map((place, placeIndex) => (
                        <div key={`${dayIndex}-${placeIndex}`} className=''>
                            <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit || place.time}</h2>
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