const rpc = require("node-bitcoin-rpc")
require("dotenv").config()
 


class BlockchainHelper {
 

    getConnectionRPC(){
        rpc.init(process.env.BITCOIN_RPC_IP, process.env.BITCOIN_RPC_PORT, process.env.BITCOIN_RPC_USER, process.env.BITCOIN_RPC_USER_PASSWORD);
    }

     constructor(){
       this.getConnectionRPC();
     }

   async getCurrentBlockHeight() {
    return new Promise((resolve,reject)=>{ 
         console.log("getCurrentBlockHeight");

         rpc.call('getblockcount', [], function (err, res) {
            if(err){
                reject(err);
            }
            resolve(res);
        }
        )
    })
    }
    
    async getBestBlockHash(){
        return new Promise((resolve,reject)=>{
            rpc.call('getbestblockhash', [], function (err, res) {
                if(err){
                    reject(err);
                }
                resolve(res.result);
            }
            )
        })
    }
    
    async getBlock(blockhash){
        return new Promise((resolve,reject)=>{
            rpc.call('getblock', [blockhash], function (err, res) {
                if(err){
                    reject(err);
                }
                resolve(res.result);
            }
            )
        }
        )
    }

    async getCurrentBlock(){
        return new Promise(async (resolve,reject)=>{
            const bhash = await this.getBestBlockHash();
            const currentBlock = await this.getBlock(bhash);
            resolve(currentBlock);
        })
    }

    async getLastBlock(){
        return new Promise(async (resolve,reject)=>{
            const bhash = await this.getBestBlockHash();

            const currentBlock = await this.getCurrentBlock();
            const lastBlock = await this.getBlock(currentBlock.previousblockhash);
            resolve(lastBlock);
            
        })
    }

    async sendSatoshis(address,amount){

        amount = (parseInt(amount) / 100000000);

        return new Promise((resolve,reject)=>{
            rpc.call('sendtoaddress', [address, amount], function (err, res) {
                if(err){
                    reject(err);
                }
                resolve(res);
            }
            )
        })
    }

    async getBalance(){
        return new Promise((resolve,reject)=>{
            rpc.call('getbalance', [], function (err, res) {
                if(err){
                    reject(err);
                }
                resolve(res);
            }
            )
        })
    }


}

module.exports = BlockchainHelper;

// bitcoin_rpc.init(config.host, config.port, config.user, config.pass);

// bitcoin_rpc.call('getblockcount', [], function (err, res) {
//    console.log(res)
// })