import { useState } from "react";
// import Image from "next/image";
// import PhantomLogo from '../assets/phantomLogo.png';
import { useContext } from 'react';
import { SolWagContext } from '../context/solWagContext';

const style = {
    wrapper: `h-screen w-full bg-primary text-white items-center flex justify-center`,
    container: `bg-slate-300/10 p-16 rounded-2xl flex flex-col items-center`,
    heading: `bg-gradient-to-r from-[#D900FA] via-[#00DBFD] to-[#00FF9D] text-transparent bg-clip-text w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
    connectButton: `bg-indigo-600 py-2 px-4 rounded-xl hover:bg-indigo-900`
    // button: ``
}

const Login = () => {
    const { connectWallet } = useContext(SolWagContext);
    
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {/* <Image src={PhantomLogo} height={50} width={50}/> */}
                <h1 className={style.heading}>Sol-Wag</h1>
            <button onClick={connectWallet} className={style.connectButton}>Connect to wallet</button>
            </div>
            {/* Login
            <h1> Wallet Address: {walletAddress} </h1> */}
        </div>
    )
}

export default Login