import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export const SolWagContext = createContext()

export const SolWagProvider = ({ children }) => {
  const router = useRouter();
 
  const [currentAccount, setCurrentAccount] = useState()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount) return
    requestToGetCurrentUsersInfo(currentAccount)
  }, [currentAccount])


  const checkIfWalletIsConnected = async () => {
    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                // console.log("Wallet Found");
                const response = await solana.connect({ onlyIfTrusted: true });
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
        alert(error);
    }
};

  const connectWallet = async () => {
    checkIfWalletIsConnected();
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      // console.log("connected with public key", response.publicKey);
      setCurrentAccount(response.publicKey.toString());
      console.log(currentAccount);
      router.push('/');
    }
  };

  
 //   const requestToGetCurrentUsersInfo = async walletAddress  => {
 //     try {
 //       const response = await fetch(
 //         `/api/db/getUserInfo?walletAddress=${walletAddress}`,
 //       )

 //       const data = await response.json()
 //       setCurrentUser(data.data)
 //     } catch (error) {
 //       console.error(error)
 //     }
 //   }

  return (
    <SolWagContext.Provider
      value={{
       
        connectWallet,
        // currentAccount,
       
      }}
    >
      {children}
    </SolWagContext.Provider>
  )
}
