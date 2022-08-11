import { useState } from 'react'

   
function Explorer() {
  

  return (
    <div  className='p-12 bg-blue-300 m-12 rounded-md'>
       
       <div className='text-white roboto flex text-3xl items-center justify-center roboto'>
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
  )
}

export default Explorer
