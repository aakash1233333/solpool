import Image from 'next/image'
import ethLogo from '../assets/eth-logo.png'
import { useEffect, useContext, useState } from 'react'
import { SolWagContext } from '../context/solWagContext'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1`,
  car: `flex p-3 m-2 items-center border-2 border-black`,
  selectedCar: `border-2 border-white flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-[#00FF9D]`,
  seat: `text-lg flex align-center`,
  priceContainer: `flex items-center mr-4`,
  price: `mr-[-0.8rem]`,
  timeInput: `mx-4 p-2 text-black outline-none mb-2`,
  timeInputLabel: `px-4 text-lg mb-2`
}

const RideSelector = ({offer}) => {
  const [carList, setCarList] = useState([])
  const { selectedRide, setSelectedRide, setPrice, basePrice, time, setTime } = useContext(SolWagContext);

  console.log("basePrice", basePrice);

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('/api/db/getRideTypes')

        const data = await response.json()
        setCarList(data.data)
        setSelectedRide(data.data[0])
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className={`${style.wrapper} ${offer}`}>
      <label htmlFor='appt' className={style.timeInputLabel}>Schedule your Ride for: </label>
          <input type="datetime-local" id="appt" name="appt"
           min="09:00" max="18:00" className={style.timeInput} onChange={e=>{setTime(e.target.value)}} required/>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div
            key={index}
            className={`${
              selectedRide.service === car.service
                ? style.selectedCar
                : style.car
            }`}
            onClick={() => {
              setSelectedRide(car)
              setPrice(((1201 / 10 ** 5) * car.priceMultiplier).toFixed(5))
            }}
          >
            <Image
              src={car.iconUrl}
              className={style.carImage}
              height={50}
              width={50}
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.service}</div>
              <div className={style.time}>{car.driver}</div>
              <div className={style.seat}><Person2OutlinedIcon className={style.seatIcon}/>{car.seats}</div>
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {((1201 / 10 ** 5) * car.priceMultiplier).toFixed(5)} SOL
              </div>
              {/* <Image src={ethLogo} height={25} width={40} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RideSelector
