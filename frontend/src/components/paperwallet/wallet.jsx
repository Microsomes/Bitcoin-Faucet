import { useEffect } from 'react';
import { useState } from 'react'


const generateWalletRoute = "/generatewallet";


function FreeCoins() {

    const [genAddress, setAddress] = useState({
        address: 'to-generate',
        privateKey: 'to-generate'
    });

    const [isGenerated, setGenerated] = useState(false);




    const generatePrivateKey = () => {

        fetch("https://slaveshipffaecet.herokuapp.com/generatewallet")
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setAddress({
                    address: data.address,
                    privateKey: data.p
                });

                setGenerated(true);

            }).catch(err => {
                console.log(err);
            })

    }


    return (
        <div >
            <div className="flex flex-col bg-white h-96 justify-center rounded-md m-12 overflow-x-hidden">
                <p className="an text-center text-black flex items-center text-5xl roboto justify-center">
                    Create a Bitcoin Paper Wallet
                </p>
            </div>

            {isGenerated ? (
                <div className='text-white flex items-center justify-center flex-col'>
                    <h2 className='font-bold text-4xl mb-2'>Your Public Address:</h2>
                    <p className='bg-white text-black rounded-md p-1'>{genAddress.address}</p>
                    <h2 className='font-bold text-4xl mb-2 mt-2'>Your Private Key- (Keep this safe):</h2>
                    <p className='bg-white text-black rounded-md p-1'>{genAddress.privateKey}</p>
                </div>
            ) : (
                <div className='text-white flex items-center justify-center text-2xl roboto'>
                    Click the button below to generate a new Bitcoin Paper Wallet
                </div>
            )}


            <div className='bg-white m-12 p-2 rounded-md'>
                <p onClick={() => { generatePrivateKey() }} className='text-center ease-in duration-300 text-5xl cursor-pointer hover:bg-black hover:text-white hover:p-12 roboto'>Generate</p>
            </div>



        </div>
    )
}

export default FreeCoins
