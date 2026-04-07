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
        people: '2+'
    }, {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icons: "👯",
        people: '2+'
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

export const AgeGroups = [
    {
        id: 1,
        title: "Infant (0-2 years)",
        value: "0-2"
    },
    {
        id: 2,
        title: "Kids (3-7 years)",
        value: "3-7"
    },
    {
        id: 3,
        title: "Children (8-12 years)",
        value: "8-12"
    },
    {
        id: 4,
        title: "Teenagers (13-17 years)",
        value: "13-17"
    },
    {
        id: 5,
        title: "Young Adults (18-35 years)",
        value: "18-35"
    },
    {
        id: 6,
        title: "Adults (35-60 years)",
        value: "35-60"
    },
    {
        id: 7,
        title: "Seniors (60+ years)",
        value: "60+"
    }
]

export const ActivityPreferences = [
    {
        id: 1,
        title: "Adventure",
        icon: "🏔️",
        desc: "Hiking, climbing & extreme sports"
    },
    {
        id: 2,
        title: "Beach",
        icon: "🏖️",
        desc: "Sun, sand & water activities"
    },
    {
        id: 3,
        title: "Cultural",
        icon: "🏛️",
        desc: "Heritage sites & local traditions"
    },
    {
        id: 4,
        title: "History",
        icon: "🏰",
        desc: "Historical landmarks & museums"
    },
    {
        id: 5,
        title: "Food",
        icon: "🍽️",
        desc: "Culinary tours & local cuisine"
    },
    {
        id: 6,
        title: "Shopping",
        icon: "🛍️",
        desc: "Markets, malls & local shops"
    },
    {
        id: 7,
        title: "Nightlife",
        icon: "🎉",
        desc: "Bars, clubs & entertainment"
    },
    {
        id: 8,
        title: "Nature",
        icon: "🌿",
        desc: "Parks, gardens & wildlife"
    },
    {
        id: 9,
        title: "Photography",
        icon: "📸",
        desc: "Scenic spots & beautiful views"
    },
    {
        id: 10,
        title: "Wellness",
        icon: "🧘",
        desc: "Yoga, spa & relaxation"
    }
]

export const AI_PROMPT = `Generate a detailed Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} Budget. The group includes people of ages: {ages}. User preferences for activities: {activities}. Create recommendations that cater to all age groups in the family and focus on the selected activities. In valid JSON format. 

IMPORTANT: 
1. You MUST generate an itinerary entry for EACH DAY from day 1 to day {totalDays}. Do not skip any days.
2. For EACH DAY, include EXACTLY 3-4 places/activities with TIME RANGES in chronological order throughout the entire day.
3. Use time ranges like "9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "5:00 PM - 7:00 PM", "7:00 PM - 9:00 PM" etc.
4. Arrange places in order: Forenoon (9 AM - 12 PM) → Afternoon (12 PM - 5 PM) → Evening/Sunset (5 PM - 8 PM) → Night (8 PM onwards)
5. Prioritize activities that match the user's preferences: {activities}
6. Choose attractions and activities that are suitable for ALL ages in the group. Include family-friendly options.
7. Consider accessibility needs for different age groups (strollers for infants, shorter walking distances for elderly, exciting activities for teenagers, educational content for children)

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
