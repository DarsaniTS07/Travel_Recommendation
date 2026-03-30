import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import landing from '../../assets/landing.png'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'
        ><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized itineraries at your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your Personal trip planner and travel curator, creating custom itinerrairs tailored to your interests and budget.</p>
        <Link to={'/create-trip'}>
        <Button >Get Started, It's Free</Button>
        </Link>

        <img src={landing} className='-mt-20'/>


    </div>
  )
}

export default Hero