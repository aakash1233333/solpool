import {
  createContext,
  useState,
  useEffect
} from 'react'
import {
  faker
} from '@faker-js/faker'
import Link from 'next/link'
import {
  useRouter
} from 'next/router';

export const SolWagContext = createContext()

export const SolWagProvider = ({
  children
}) => {
  const router = useRouter();
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [pickupCoordinates, setPickupCoordinates] = useState()
  const [dropoffCoordinates, setDropoffCoordinates] = useState()
  const [currentAccount, setCurrentAccount] = useState()
  const [currentUser, setCurrentUser] = useState([])
  const [selectedRide, setSelectedRide] = useState([])
  const [price, setPrice] = useState()
  const [basePrice, setBasePrice] = useState()
  const [ride, setRide] = useState('block');
  const [offer, setOffer] = useState('hidden');
  const [time, setTime] = useState('');
  let metamask

  if (typeof window !== 'undefined') {
    metamask = window.ethereum
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount) return
    requestToGetCurrentUsersInfo(currentAccount)
  }, [currentAccount])

  useEffect(() => {
    if (!pickupCoordinates || !dropoffCoordinates) return;
    (async () => {
      try {
        const response = await fetch('/api/map/getDuration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickupCoordinates: `${pickupCoordinates[0]},${pickupCoordinates[1]}`,
            dropoffCoordinates: `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`,
          }),
        })

        const data = await response.json()
        setBasePrice(Math.round(await data.data))
      } catch (error) {
        console.error(error)
      }
    })()
  }, [pickupCoordinates, dropoffCoordinates])

  const checkIfWalletIsConnected = async () => {
    try {
      const {
        solana
      } = window;

      if (solana) {
        if (solana.isPhantom) {
          // console.log("Wallet Found");
          const response = await solana.connect({
            onlyIfTrusted: true
          });
          // console.log(
          //   "connected with publickey:",
          //   response.publicKey.toString()
          // );
          setCurrentAccount(response.publicKey.toString());
        }
      } else {
        alert("Get a phantom wallet")
        console.log("Get a phantom wallet");
      }
    } catch (error) {
      // alert(error);
    }
  };



  const connectWallet = async () => {
    checkIfWalletIsConnected();
    const {
      solana
    } = window;
    if (solana) {
      const response = await solana.connect();
      // console.log("connected with public key", response.publicKey);
      setCurrentAccount(response.publicKey.toString());
      console.log(currentAccount);
      router.push('/');
    }
  };

  // const connectWallet = async () => {
  //   if (!window.ethereum) return
  //   try {
  //     const addressArray = await window.ethereum.request({
  //       method: 'eth_requestAccounts',
  //     })

  //     if (addressArray.length > 0) {
  //       setCurrentAccount(addressArray[0])
  //       requestToCreateUserOnSanity(addressArray[0])
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const createLocationCoordinatePromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('api/map/getLocationCoordinates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: locationName,
          }),
        })

        const data = await response.json()

        if (data.message === 'success') {
          switch (locationType) {
            case 'pickup':
              setPickupCoordinates(data.data)
              break
            case 'dropoff':
              setDropoffCoordinates(data.data)
              break
          }
          resolve()
        } else {
          reject()
        }
      } catch (error) {
        console.error(error)
        reject()
      }
    })
  }

  useEffect(() => {
    if (pickup && dropoff) {
      ;
      (async () => {
        await Promise.all([
          createLocationCoordinatePromise(pickup, 'pickup'),
          createLocationCoordinatePromise(dropoff, 'dropoff'),
        ])
      })()
    } else return
  }, [pickup, dropoff])

  const requestToCreateUserOnSanity = async address => {
    if (!window.ethereum) return
    try {
      await fetch('/api/db/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: address,
          name: faker.name.findName(),
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const requestToGetCurrentUsersInfo = async walletAddress => {
    try {
      const response = await fetch(
        `/api/db/getUserInfo?walletAddress=${walletAddress}`,
      )

      const data = await response.json()
      setCurrentUser(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return ( < SolWagContext.Provider value = {
      {
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        pickupCoordinates,
        setPickupCoordinates,
        dropoffCoordinates,
        setDropoffCoordinates,
        connectWallet,
        currentAccount,
        setCurrentAccount,
        currentUser,
        selectedRide,
        setSelectedRide,
        price,
        setPrice,
        basePrice,
        metamask,
        ride,
        setRide,
        offer,
        setOffer,
        time,
        setTime
      }
    } >
    {
      children
    } </SolWagContext.Provider>
  )
}