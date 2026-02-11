import React from 'react'
import logo from '../../assets/logoipsum-365.svg'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='w-full p-3 shadow-sm flex justify-between items-center px-5'>
        <img src={logo} alt="Logo" />
        <Button>
            Sign In
        </Button>
    </div>
  )
}

export default Header