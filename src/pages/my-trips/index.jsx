import UserTripCardItem from '@/components/custom/UserTripCardItem';
import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyTrips = () => {

    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/')
            return;
        }
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([]);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()])

        })
    }

    useEffect(() => {
        GetUserTrips();
    }, [])



    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 py-10'>
            <div className='space-y-3 mb-10'>
              <h2 className='font-bold text-4xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>My Trips</h2>
              <p className='text-gray-600'>View and manage all your travel adventures</p>
            </div>
            
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip} className='object-cover rounded-xl ' />
                ))
                : [1,2,3,4,5,6].map((item, index) => (
                    <div key={index} className='h-72 w-full bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse rounded-2xl shadow-md'>
                         
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTrips