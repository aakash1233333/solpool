import { useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { SolWagContext } from '../context/solWagContext'

const style = {
  wrapper: `flex-1 h-full w-full`,
}

mapboxgl.accessToken = 'pk.eyJ1Ijoiamlnb2xvIiwiYSI6ImNsYWtoeDdiZTAwaWszb245ZTlieWNiMmsifQ.GMIefrqywj19pkbxdcSjqw';

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates } = useContext(SolWagContext)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [77.21956281401839,28.632914608997154],
      zoom: 10,
    })

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates)
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates)
    }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: 400,
      })
    }
  }, [pickupCoordinates, dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  return <div className={style.wrapper} id='map' />
}

export default Map
