import { useState } from 'react'

   
function Explorer() {
  
    const [blockchainstats, setBlockchainStats] = useState({
        "difficulty": {
            label:"Difficulty",
            value: 0
        },
        "currentHeight": {
            label:"Current Height",
            value: 0
        },
        "currentHashrate": {
            label:"Current Hashrate",
            value: 0
        },
        "unconfirmedtx": {
            label:"Unconfirmed Transactions",
            value: 0
        },
        "currentPrice" : {
            label:"Current Price",
            value: 0
        },
    })

  return (
    <div>
        
       <div className='   min-h-0 flex justify-around p-3 flex-wrap mt-3 rounded-md'>
        {Object.keys(blockchainstats).map((key) => {
            return (
                <div  className=' h-full w-32 p-3 rounded-md  bg-white'>
                <p className='text-black text-sm text-center mt-2 roboto'>{blockchainstats[key].label}</p>
                <h2 className='text-center mt-2 text-3xl'>{ blockchainstats[key].value }</h2>
                </div>
            )
        })}
       </div>
     <div  className='p-12 bg-white text-black  m-12 rounded-md'>

        
       
       <div className='text-black roboto flex text-3xl items-center justify-center roboto'>
            Explorer the Bitcoin Blockchain
       </div>
 

       <div className='mt-12'>
        <form> 
            <input   type={'text'} placeholder='Enter a Bitcoin Address to Search' className='w-full h-12 rounded-md border-2 border-black p-2 m-2'></input>
            <input type={'text'} placeholder='Enter a Transaction Hash to Search' className='w-full h-12 rounded-md border-2 border-black p-2 m-2'></input>
            <input type={'submit'} className='w-full h-12 hover:bg-black hover:text-white rounded-md cursor-pointer border-2 border-black p-2 m-2'></input>
        </form>
       </div>
       
      

    </div>
    </div>
  )
}

export default Explorer
