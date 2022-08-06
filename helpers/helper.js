import rpc from 'node-bitcoin-rpc';
import config from 'dotenv'
config.config();


export default class BlockchainHelper {

    config = {
        protocol: 'https',
        user: process.env.BITCOIN_RPC_USER,
        pass: process.env.BITCOIN_RPC_USER_PASSWORD,
        host: process.env.BITCOIN_RPC_IP,
        port: process.env.BITCOIN_RPC_PORT,
     };

    runRPCMethod(method,params){}
    


}