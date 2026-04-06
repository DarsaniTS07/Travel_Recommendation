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
    <div className='space-y-8'>
        <div className='space-y-2'>
          <h2 className='font-bold text-3xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>🗺️ Itinerary & Places to Visit</h2>
          <p className='text-gray-600'>Explore the best places day by day</p>
        </div>
        <div className='space-y-10'>
            {itinerary && itinerary.length > 0 ? (
              itinerary.map((item, dayIndex) => (
                <div key={dayIndex} className='bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow'> 
                    <h2 className='font-bold text-2xl text-blue-600 mb-5 pb-3 border-b-2 border-blue-100'>
                      📅 Day {item.day || dayIndex + 1}: {item.theme || 'Day Plan'}
                    </h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item?.places && item?.places.length > 0 ? (
                      item?.places?.map((place, placeIndex) => (
                        <div key={`${dayIndex}-${placeIndex}`}>
                            <h2 className='font-semibold text-sm text-orange-600 bg-orange-50 inline-block px-3 py-1 rounded-full mb-2'>⏰ {place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place}/>                   
                        </div>
                      ))
                    ) : item?.schedule && item?.schedule.length > 0 ? (
                      item?.schedule?.map((place, placeIndex) => (
                        <div key={`${dayIndex}-${placeIndex}`}>
                            <h2 className='font-semibold text-sm text-orange-600 bg-orange-50 inline-block px-3 py-1 rounded-full mb-2'>⏰ {place.bestTimeToVisit || place.time}</h2>
                            <PlaceCardItem place={place}/>                   
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500 col-span-2'>No places available for this day</p>
                    )}
                    </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-center py-10'>No itinerary available</p>
            )}
        </div>
    </div>
  )
}

export default PlacesToVisit