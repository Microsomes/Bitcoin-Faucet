import { useEffect } from 'react';
import { useState } from 'react'


const generateWalletRoute = "/generatewallet";


function FreeCoins() {

    const [setAddress, genAddress] = useState({
        address:'to-generate',
        privateKey:'to-generate'
    });

  


    const generatePrivateKey = () => {
        
        useEffect(()=>{
            fetch("http://localhost:3000/generatewallet")
            .then(res => res.json())
            .then(data => {
               console.log(data);
            })
    
        },[]);

    }

   
  return (
    <div >
        <div className="flex flex-col bg-white h-96 justify-center rounded-md m-12 overflow-x-hidden">
            <p className="an text-center text-black flex items-center text-5xl roboto justify-center">
                Create a Bitcoin Paper Wallet
            </p>
        </div>

    
        <div className='bg-white m-12 p-2 rounded-md'>
            <p onClick={()=>{ generatePrivateKey() }} className='text-center ease-in duration-300 text-5xl cursor-pointer hover:bg-black hover:text-white hover:p-12 roboto'>Generate</p>
        </div>
 
     

    </div>
  )
}

export default FreeCoins
