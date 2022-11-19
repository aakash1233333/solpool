import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { SolWagProvider } from '../context/solWagContext'

function MyApp({ Component, pageProps }) {
  return (
    <SolWagProvider>
      <Component {...pageProps} />
    </SolWagProvider>
  )
}

export default MyApp
