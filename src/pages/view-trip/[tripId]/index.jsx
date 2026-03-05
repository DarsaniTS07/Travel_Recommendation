import Hotels from '@/components/Hotels';
import InfoSection from '@/components/InfoSection';
import PlacesToVisit from '@/components/PlacesToVisit';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

const Viewtrip = () => {

    const { tripId } = useParams();
    const [trip,setTrip] = useState();

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            console.log("No such Document");
            toast("No trip Found")

        }
    }

// Used to get information from firebase
   

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        tripId && GetTripData();
    }, [tripId])

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip}/>


            {/* Recommended Hotels */}
            <Hotels trip={trip}/>

            {/* Itenary */}
            <PlacesToVisit trip={trip}/>

            {/* Footer */}

        </div>
    )
}

export default Viewtrip