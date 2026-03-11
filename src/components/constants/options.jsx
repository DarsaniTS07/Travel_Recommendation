export const SelectTravelesList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveles in exploration",
        icons: "👤",
        people: '1'
    }, {
        id: 2,
        title: "A couple",
        desc: "Two traveles in tandem",
        icons: "👫",
        people: '2 People'
    }, {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adventurers",
        icons: "👨‍👩‍👧‍👦",
        people: '3 to 5 People'
    }, {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icons: "👯",
        people: '5 to 10 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Dont hold back on the expenses",
        icon: "💸",
    }
]

export const AI_PROMPT = `Generate a detailed Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} Budget in valid JSON format. 

IMPORTANT: 
1. You MUST generate an itinerary entry for EACH DAY from day 1 to day {totalDays}. Do not skip any days.
2. For EACH DAY, include EXACTLY 3-4 places/activities with TIME RANGES in chronological order throughout the entire day.
3. Use time ranges like "9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "5:00 PM - 7:00 PM", "7:00 PM - 9:00 PM" etc.
4. Arrange places in order: Forenoon (9 AM - 12 PM) → Afternoon (12 PM - 5 PM) → Evening/Sunset (5 PM - 8 PM) → Night (8 PM onwards)

Return ONLY the JSON with this exact structure (no markdown, no code blocks, just raw JSON):
{
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "hotelImageUrl": "string",
      "geoCoordinates": "string",
      "rating": "number",
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": "number",
      "theme": "string",
      "places": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeImageUrl": "string",
          "geoCoordinates": "string",
          "ticketPricing": "string",
          "rating": "string",
          "timeToTravel": "string",
          "bestTimeToVisit": "time range like 9:00 AM - 11:00 AM or 1:00 PM - 3:00 PM"
        }
      ]
    }
  ]
}`
