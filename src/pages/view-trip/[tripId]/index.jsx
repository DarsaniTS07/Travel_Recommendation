import Footer from '@/components/custom/Footer';
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
    const [loading, setLoading] = useState(true);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document:", docSnap.data());
                setTrip(docSnap.data())
            } else {
                console.log("No such Document");
                toast("No trip Found")
            }
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error("Failed to load trip");
        } finally {
            setLoading(false);
        }
    }

// Used to get information from firebase
   
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        tripId && GetTripData();
    }, [tripId])

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {loading ? (
                <div className='text-center py-20'>
                    <p className='text-xl text-gray-500'>Loading your trip...</p>
                </div>
            ) : (
                <>
                    {/* Information Section */}
                    <InfoSection trip={trip}/>

                    {/* Recommended Hotels */}
                    <Hotels trip={trip}/>

                    {/* Itenary */}
                    <PlacesToVisit trip={trip}/>

                    {/* Footer */}
                    <Footer trip={trip}/>
                </>
            )}
        </div>
    )
}

export default Viewtrip