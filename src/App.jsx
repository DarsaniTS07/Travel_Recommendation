import './App.css'
import { useEffect } from 'react'
import Hero from './components/custom/Hero'
import { Button } from './components/ui/button'

function App() {
  useEffect(() => {
    // Load Google Maps API script with the API key from environment
    const scriptId = 'google-maps-script'
    
    // Check if script is already loaded
    if (document.getElementById(scriptId)) {
      return
    }

    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    
    if (!apiKey) {
      console.error('Google Places API key is missing. Please add VITE_GOOGLE_PLACE_API_KEY to .env.local')
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Optional: Clean up if needed
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <Hero/>

    </div>
  )
}

export default App
