import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import 'mapbox-gl/dist/mapbox-gl.css'
import {SolWagProvider} from '../context/SolWagContext'

export default function App({Component,pageProps}) {

  return ( <SolWagProvider >
    <Component { ...pageProps }/>
     </SolWagProvider> )


  }