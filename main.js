var bitcoin_rpc = require('node-bitcoin-rpc')

var config = {
    protocol: 'https',
    user: 'root1',
    pass: 'root1',
    host: '159.65.16.166',
    port: '8332',
 };


 bitcoin_rpc.init(config.host, config.port, config.user, config.pass);

 bitcoin_rpc.call('getblockcount', [], function (err, res) {
    console.log(res)
})