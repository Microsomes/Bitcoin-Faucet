import { useState } from 'react'

import "./Freecoin.css";
import Satoshi from './satoshi.jpg'
 
function FreeCoins() {
  const [count, setCount] = useState(0)

  const components = [
    "freecoins",
    "blockexplorer",
    "paperwallet"
  ]

  const [currentComponent, setCurrentComponent] = useState(components[0])


  return (
    <div >
        <div className="flex flex-col bg-white h-96 justify-center rounded-md m-12 overflow-x-hidden">
            <p className="an text-center text-black flex items-center text-5xl roboto justify-center">
                Everyone deserves to explore the blockchain.
            </p>
        </div>

        <div className='text-white flex items-center justify-center text-2xl roboto'>
            Receive 1000 Sats completely free
        </div>

        <div className='m-12 flex items-center  rounded-md bg-white'>
            <input placeholder='Enter your wallet address' className='w-full h-12 rounded-md border-2 border-black p-2 m-2'></input>
            <button className='w-full h-12 hover:bg-black hover:text-white rounded-md border-2 border-black p-2 m-2'>Get Free Coins</button>

        </div>

    </div>
  )
}

export default FreeCoins
