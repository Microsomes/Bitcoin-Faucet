import { useState } from 'react'

import "./Freecoin.css";
import Satoshi from './satoshi.jpg'

import bitadressqr from "./qr.png";
import { useEffect } from 'react';

function FreeCoins() {
  const [count, setCount] = useState(0)

  const components = [
    "freecoins",
    "blockexplorer",
    "paperwallet"
  ]

  const [currentComponent, setCurrentComponent] = useState(components[0])


  const [currentSats, setSats] = useState(0)

  const apiGETBALANCE = "/getbalance";

  const getCurrentSats = ()=>{
        fetch("http://localhost:3000/"+apiGETBALANCE)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setSats(data.balance)
            }
        )
  }


  const [satoshiQuote, setSatoshiQuote] = useState("")

  const satoshiAllQuotes = [
    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.",
    "If you don’t believe it or don’t get it, I don’t have the time to try to convince you, sorry.",
    "WikiLeaks has kicked the hornet’s nest, and the swarm is headed towards us.",
    "Lost coins only make everyone else’s coins worth slightly more.  Think of it as a donation to everyone.",
    "In a few decades when the reward gets too small, the transaction fee will become the main compensation for [mining] nodes. I’m sure that in 20 years there will either be very large transaction volume or no volume.",
    "A lot of people automatically dismiss e-currency as a lost cause because of all the companies that failed since the 1990’s. I hope it’s obvious it was only the centrally controlled nature of those systems that doomed them. I think this is the first time we’re trying a decentralized, non-trust-based system.",
    "As computers get faster and the total computing power applied to creating bitcoins increases, the difficulty increases proportionally to keep the total new production constant. Thus, it is known in advance how many new bitcoins will be created every year in the future.",
  ]

  //get random qoute
    const getRandomQuote = ()=>{
       //satoshiAllQuotes randomy pick one
         const randomIndex = Math.floor(Math.random() * satoshiAllQuotes.length);
            
         setSatoshiQuote(satoshiAllQuotes[randomIndex])

    }

    useEffect(() => {
        getRandomQuote()
        getCurrentSats()
    }, [])


  return (
    <div >

        <div className='flex items-center '>


        <div className='ml-12 flex flex-col roboto bg-white p-1 mr-12 rounded-md'>
                <p className='text-2xl text-center'>Address<br></br> </p>

                <img src={bitadressqr} className='w-32 h-32'></img>
            </div>

            <div className='flex-grow'></div>
            
            <div className=' flex items-center justify-center roboto bg-white  p-1 mr-12 rounded-md'>
                <p className='text-2xl text-center'> ₿ {currentSats} sats</p>
            </div>
        </div>
        
        <div className="flex flex-col bg-white justify-center rounded-md m-12 overflow-x-hidden">
            <p className=" p-2 roboto text-center text-black flex items-center text-2xl roboto justify-center">
                {satoshiQuote}
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
