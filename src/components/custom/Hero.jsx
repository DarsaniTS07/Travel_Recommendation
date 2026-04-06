import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import landing from '../../assets/landing.png'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-auto px-4 md:px-56 gap-9 py-16'>
        <div className='text-center space-y-4'>
          <h1 className='font-extrabold text-5xl md:text-6xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 bg-clip-text text-transparent'>
            Discover Your Next Adventure with AI
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </p>
        </div>
        
        <Link to={'/create-trip'}>
          <Button className='px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
            Get Started, It's Free
          </Button>
        </Link>

        <div className='w-full max-w-2xl mt-8 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
          <img src={landing} className='w-full h-auto object-cover' alt='Travel landing'/>
        </div>
    </div>
  )
}

export default Hero