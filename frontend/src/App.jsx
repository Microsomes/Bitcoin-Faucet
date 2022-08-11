import { useState } from 'react'
import reactLogo from './assets/react.svg'
import FreeCoinsComp from './components/freecoins/FreeCoins';
import Explorer from './components/explorer/Explorer'
import PaperWallet from './components/paperwallet/wallet'

import "./App.css"
 
function App() {
  const [count, setCount] = useState(0)

  const components = [
    "freecoins",
    "blockexplorer",
    "paperwallet"
  ]

  const [currentComponent, setCurrentComponent] = useState(components[0])



  return (
    <div className="flex flex-col overflow-x-hidden	">
  
      <div className='flex flex-col flex w-screen bg-yellow-300'>
       
        <div className='ml-12 bg-yellow-300 text-white p-12 '>
          <p className='text-black text-5xl fancy'>Slate Ship</p>
          <p className='text-sm text-black roboto'>Sponsored by LULU Productions</p>
        </div>

        <div className='flex-grow'></div>

        <div className='mr-12 flex space-x-12 justify-center items-center mb-12'>
        <a onClick={(event)=>{setCurrentComponent(components[0])}} href='#' className={` roboto rounded-md p-1  ${currentComponent == components[0] ? 'active': ''}  `}>Free Sats </a>
        <a onClick={(event)=>{setCurrentComponent(components[1])}} href='#' className={` roboto rounded-md p-1  ${currentComponent == components[1] ? 'active': ''}  `}>Block Explorer </a>
        <a onClick={(event)=>{setCurrentComponent(components[2])}} href='#' className={` roboto rounded-md p-1  ${currentComponent == components[2] ? 'active': ''}  `}>Paper Wallet</a>
        </div>

         
      </div>

      <div className='bg-black flex-grow h-screen'>
        main render view

        {currentComponent == components[0] ? <FreeCoinsComp /> : null}
        {currentComponent == components[1] ? <Explorer /> : null}
        {currentComponent == components[2] ? <PaperWallet /> : null}

      </div>

      {/* <div className="flex-grow flex-col text-center roboto text-2xl text-gray-300 flex items-center justify-center h-96 bg-white">
       <p className='text-3xl'> Open Source Software.</p>
       <p className='text-xl'>Source code Available on Github</p>
      </div> */}

 

    </div>
  )
}

export default App
