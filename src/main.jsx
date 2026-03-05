import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import CreateTrip from './pages/create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './pages/view-trip/[tripId]'

// Load Google Maps API script before rendering the app
const loadGoogleMapsScript = () => {
  const scriptId = 'google-maps-script'
  
  // Check if script is already loaded
  if (document.getElementById(scriptId)) {
    return Promise.resolve()
  }

  const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY
  
  if (!apiKey) {
    console.error('Google Places API key is missing. Please add VITE_GOOGLE_PLACE_API_KEY to .env.local')
    return Promise.reject(new Error('Google API key missing'))
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    
    script.onload = () => {
      // Wait for the API to be ready
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('Google Maps API loaded successfully')
        resolve()
      } else {
        // Try again in a moment if not ready
        setTimeout(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            resolve()
          } else {
            reject(new Error('Google Maps Places API not available'))
          }
        }, 100)
      }
    }
    
    script.onerror = () => {
      console.error('Failed to load Google Maps API')
      reject(new Error('Failed to load Google Maps API'))
    }
    
    document.head.appendChild(script)
  })
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  }
])

// Load Google Maps script and then render the app
loadGoogleMapsScript()
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header/>
        <Toaster/>
        <RouterProvider router={router}/>
        </GoogleOAuthProvider>
      </StrictMode>,
    )
  })
  .catch((error) => {
    console.error('Failed to load Google Maps:', error)
    // Still render the app even if Google Maps fails
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header/>
        <Toaster/>
        <RouterProvider router={router}/>
        </GoogleOAuthProvider>
      </StrictMode>,
    )
  })
