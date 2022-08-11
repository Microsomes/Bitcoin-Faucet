import { useEffect } from 'react'
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
        "currentNonce": {
            label:"Current Block Nonce",
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

    //connect to web socket
    useEffect(() => {
        const ws = new WebSocket('wss://ws.blockchain.info/inv')
        ws.onopen = () => {
            ws.send(JSON.stringify({"op":"unconfirmed_sub"}))

            ws.send(JSON.stringify({"op":"ping_block"}))

        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)


            if(data.op == "block"){
                setBlockchainStats((prevStats) => {
                    return {
                        ...prevStats,
                        currentHeight: {
                            ...prevStats.currentHeight,
                            value: data.x.height
                        },
                        currentNonce: {
                            ...prevStats.currentNonce,
                            value: data.x.nonce
                        }
                    }
                })
            }

            if(data.op == "utx"){
                setBlockchainStats((prev) => {
                    return {
                        ...prev,
                        unconfirmedtx: {
                            ...prev.unconfirmedtx,
                            value: prev.unconfirmedtx.value + 1
                        }
                    }
                })
            }
        }

        //current hash rate bitcoin
        fetch("https://api.blockchain.info/stats")
            .then(res => res.json())
            .then(data => {
                setBlockchainStats((prev) => {
                    return {
                        ...prev,
                        currentHashrate: {
                            ...prev.currentHashrate,
                            value: data.hash_rate
                        },
                        difficulty: {
                            ...prev.difficulty,
                            value: data.difficulty
                        },
                        currentPrice: {
                            ...prev.currentPrice,
                            value: data.market_price_usd
                        }
                    }
                })
            })

        //get bitcoin difficulty
        fetch("https://blockchain.info/q/getdifficulty")
            .then(res => res.text())
            .then(data => {
                setBlockchainStats((prev) => {
                    return {
                        ...prev,
                        difficulty: {
                            ...prev.difficulty,
                            value:  parseFloat(data).toFixed(2)
                        }
                    }
                })
            }
            ).catch(err => {
                console.log(err);
            }
            )

            //connect to binance web socket btcusdt
            const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker')
            binanceWS.onmessage = (event) => {
                const data = JSON.parse(event.data)
                setBlockchainStats((prev) => {
                    return {
                        ...prev,
                        currentPrice: {
                            ...prev.currentPrice,
                            value: "$"+parseFloat(data.c).toFixed(2)
                        }
                    }
                })
            }
    }, [])


    const [inputAddress, setInputAddress] = useState("")
    const [inputTXHash, setTxHash] = useState("")


    const getBalanceOfAddress = (address) => {
        fetch(`https://blockchain.info/q/addressbalance/${address}`)
            .then(res => res.text())
            .then(data => {
                console.log(data);
            })

    }

    const getTransaction = (txHash) => {
        fetch(`https://blockchain.info/rawtx/${txHash}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    const submitSearch = (e) => {
        e.preventDefault()
        if(inputAddress !== ""){
            getBalanceOfAddress(inputAddress)
        }
        if(inputTXHash !== ""){
            getTransaction(inputTXHash)
        }
    }


    
  return (
    <div>
       <div className='min-h-0 flex justify-around p-3 flex-wrap mt-3 rounded-md'>
        {Object.keys(blockchainstats).map((key) => {
            return (
                <div key={key}  className=' h-full w-96 m-2 p-3 rounded-md  bg-white'>
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
            <input onKeyUp={(event)=>{ setInputAddress(event.target.value)  }} type={'text'} placeholder='Enter a Bitcoin Address to Search' className='w-full h-12 rounded-md border-2 border-black p-2 m-2'></input>
            <input onKeyUp={(event)=>{ setTxHash(event.target.value) }} type={'text'} placeholder='Enter a Transaction Hash to Search' className='w-full h-12 rounded-md border-2 border-black p-2 m-2'></input>
            <input onSubmit={(event)=> submitSearch(event)} type={'submit'} className='w-full h-12 hover:bg-black hover:text-white rounded-md cursor-pointer border-2 border-black p-2 m-2'></input>
        </form>
       </div>
       
      

    </div>
    </div>
  )
}

export default Explorer
