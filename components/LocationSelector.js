import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { SolWagContext } from '../context/solWagContext'

const style = {
  wrapper: `pt-2 bg-primary text-white border-white`,
  searchHeader: `w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
  searchHeaderSpan: `bg-gradient-to-r from-[#D900FA] via-[#00DBFD] to-[#00FF9D] text-transparent bg-clip-text`,
  inputBoxes: `flex flex-col mb-4 relative`,
  inputBox: `h-10 mx-4 border-2 bg-[#eeeeee] flex items-center my-1 py-1 px-2 text-black`,
  focusedInputBox: `border-white`,
  svgContainer: `mx-1`,
  input: `my-2 rounded-2 p-2 outline-none border-none bg-transparent  h-full w-full`,
  verticalLine: `w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]`,
  outerWrapper: `flex justify-around bg-primary`,
  outerWrapperHeader: `text-xl w-3/6 text-center py-6 cursor-pointer`,
  wrapperFindRide: `bg-primary`
}

const LocationSelector = ({offer}) => {
  const [inFocus, setInFocus] = useState('from');
  const { pickup, setPickup, dropoff, setDropoff } = useContext(SolWagContext);
  // const [offerDisplay, setOfferDisplay] = useState('block');
  // const [rideDisplay, setRideDisplay] = useState('hidden');
  // const [tripList, setTripList] = useState([]);
  // useEffect(()=>{
  //   ;(async ()=>{
  //     try{
  //       const response = await fetch('/api/db/getTrips');
  //       const data = await response.json();
  //       console.log(data.data);
  //       setTripList(data.data);
  //     }
  //     catch(error){
  //       console.log(error);
  //   }
  //   })()
  // },[])
  return (
    <>
      {/* <div className={style.outerWrapper}>
        <div className={`${style.outerWrapperHeader} border-slate-400 border-b-2 text-slate-400`} onClick={()=>{
          setOfferDisplay('hidden');
          setRideDisplay('block');
        }}>Find Pool</div>
        <div className={`${style.outerWrapperHeader} border-l-2 border-white border-b-2`} onClick={()=>{
          setOfferDisplay('block');
          setRideDisplay('hidden');
        }}>Offer Pool</div>
      </div> */}
      <div className={`${style.wrapper} ${offer}`}>
        <div className={style.searchHeader}>
          <span className={style.searchHeaderSpan}>{inFocus === 'from' ? 'Where can we pick you up?' : 'Where to?'}</span>
        </div>
        <div className={style.inputBoxes}>
          <div
            className={`${style.inputBox} ${inFocus === 'from' && style.focusedInputBox
              }`}
          >
            <div className={style.svgContainer}>
              <svg viewBox='0 0 24 24' width='1em' height='1em'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z'
                />
              </svg>
            </div>
            <input
              className={style.input}
              placeholder='Enter pickup location'
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              onFocus={() => setInFocus('from')}
            />
          </div>
          <div className={style.verticalLine} />
          <div
            className={`${style.inputBox} ${inFocus === 'to' && style.focusedInputBox
              }`}
          >
            <div className={style.svgContainer}>
              <svg viewBox='0 0 24 24' width='1em' height='1em'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14 10h-4v4h4v-4zM7 7v10h10V7H7z'
                />
              </svg>
            </div>
            <input
              className={style.input}
              placeholder='Where to?'
              value={dropoff}
              onChange={e => setDropoff(e.target.value)}
              onFocus={() => setInFocus('to')}
            />
          </div>
          
        </div>
      </div>
      {/* <div className={`${style.wrapperFindRide} ${rideDisplay}`}>
        <h1>Available Rides:</h1>
        {tripList.map((trip, index)=>{
          return(
            <div key={index}>
              <span>From: {trip.pickup}</span>
              <span>To: {trip.dropoff}</span>
              <span>Price: {trip.price} eth</span>
              <span>Ride: {trip.rideCategory}</span>
            </div>
          )
        })}
      </div> */}
    </>
  )
}

export default LocationSelector
