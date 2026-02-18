import {
    GoogleGenerativeAI,

} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
});

const generationConfig = {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap Budget Give me a Hotels options list with HotelName, Hotel address, Price hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format"
                }
            ]
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
                        "hotels": [
                        {
                            "hotelName": "The D Las Vegas",
                            "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
                            "price": "$50–$100 per night",
                            "hotelImageUrl": "https://www.theDcasino.com/images/hero/main-hero-02.jpg",
                            "geoCoordinates": "36.1695, -115.1438",
                            "rating": "3.5 stars",
                            "description": "A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool and several dining options"
                        }
                        ]
                    }`
                }
            ]
        }
    ]
});

