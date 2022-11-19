import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { SolWagContext } from '../context/solWagContext'
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image'
import ethLogo from '../assets/eth-logo.png'

const style = {
    wrapper: `flex flex-col items-center bg-primary`,
    heading: `bg-gradient-to-r from-[#D900FA] via-[#00DBFD] to-[#00FF9D] text-transparent bg-clip-text w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
    tripItem: `flex flex-col p-4 border-b-2 border-slate-300 w-11/12 cursor-pointer hover:bg-slate-100/5 rounded-t-2xl my-3`,
    dropOff: `flex justify-between text-xl pb-2 px-px`,
    price: `flex items-center`
}

const PoolList = ({ride}) => {
    const [tripList, setTripList] = useState([]);
    useEffect(() => {
        ; (async () => {
            try {
                const response = await fetch('/api/db/getTrips');
                const data = await response.json();
                console.log(data.data);
                setTripList(data.data);
            }
            catch (error) {
                console.log(error);
            }
        })()
    }, [])
    return (
        <div className={`${style.wrapper} ${ride}`}>
            <h1 className={style.heading}>Available Rides:</h1>
            {tripList.map((trip, index) => {
                return (
                    <div key={index} className={style.tripItem}>
                        <div className={style.dropOff}>
                            <span>From: {trip.pickup}</span>
                            <span>To: {trip.dropoff}</span>
                        </div>
                        <span><EventIcon /> {trip.scheduled.split("T")[1]}, {trip.scheduled.split("T")[0]}</span>
                        <span className={style.price}>{trip.price}<Image src={ethLogo} height={25} width={40} /></span>
                    </div>
                )
            })}
        </div>
    )
}

export default PoolList