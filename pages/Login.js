import { useState } from "react";
import Image from "next/image";
import PhantomLogo from '../assets/phantomLogo.png';
import { useContext } from 'react';
import { SolWagContext } from '../context/solWagContext';
// import LoginBg from '../assets/LoginBg.webp';
const style = {
    wrapper: `h-screen w-full bg-primary text-white items-center flex justify-center bg-login-bg`,
    container: `bg-slate-300/10 p-16 rounded-2xl flex flex-col items-center`,
    heading: `bg-gradient-to-r from-[#D900FA] via-[#00DBFD] to-[#00FF9D] text-transparent bg-clip-text w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
    connectButton: `bg-indigo-600 py-2 px-4 rounded-xl hover:bg-indigo-900`
    // button: ``
}

const Login = () => {
    const { connectWallet, setCurrentAccount } = useContext(SolWagContext);
    // const [walletAddress, setWalletAddress] = useState(null);
    // const checkIfWalletIsConnected = async () => {
    //     try {
    //         const { solana } = window;

    //         if (solana) {
    //             if (solana.isPhantom) {
    //                 // console.log("Wallet Found");
    //                 const response = await solana.connect({ onlyIfTrusted: true });
    //                 // console.log(
    //                 //   "connected with publickey:",
    //                 //   response.publicKey.toString()
    //                 // );
    //                 setWalletAddress(response.publicKey.toString());
    //             }
    //         } else {
    //             alert("Get a phantom wallet")
    //             console.log("Get a phantom wallet");
    //         }
    //     } catch (error) {
    //         alert(error);
    //     }
    // };

    // const connectWallet = async () => {
    //     checkIfWalletIsConnected();
    //     const { solana } = window;
    //     if (solana) {
    //       const response = await solana.connect();
    //       // console.log("connected with public key", response.publicKey);
    //       setWalletAddress(response.publicKey.toString());
          
    //     }
    //   };

    const disconnectWallet = async () => {
        const { solana } = window;
        if (solana) {
          await solana.disconnect();
          setCurrentAccount(null);
            console.log("disconnect")
            // disconnectWallet()
        }
      };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Image src={PhantomLogo} height={50} width={50}/>
                <h1 className={style.heading}>Sol-Wag</h1>
            <button onClick={connectWallet} className={style.connectButton}>Connect to wallet</button>
            <button onClick={disconnectWallet}>Disconnect</button>
            </div>
            {/* Login
            <h1> Wallet Address: {walletAddress} </h1> */}
        </div>
    )
}

export default Login