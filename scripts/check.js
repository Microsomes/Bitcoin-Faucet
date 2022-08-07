const rpc = require("node-bitcoin-rpc")
require("dotenv").config()


rpc.init(process.env.BITCOIN_RPC_IP, process.env.BITCOIN_RPC_PORT, process.env.BITCOIN_RPC_USER, process.env.BITCOIN_RPC_USER_PASSWORD);


// rpc.call('getblockcount', [], function (err, res) {
//     console.log(res)
//     }
// )

// //list all the server addresses
// rpc.call('getaddressesbylabel', ["one"], function (err, res) {
//     console.log(res)
//     }
// )


rpc.call('getbalance', [], function (err, res) {
    console.log(res)
    }
)

// rpc.call('sendtoaddress', ["bc1qnnjjg0gdp8u063fm5g8uz7xs6lggefl6zf2429", "0.00001000"], function (err, res) {
//     console.log(res)
//     }
// )

