
//wss://stream.binance.com:9443
//wss://stream.binance.com:9443/ws/btcusdt@depth
//connect
const WebSocket = require("ws").WebSocket


//average btcusd price
const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcbusd@aggTrade',{
    perMessageDeflate: false
});

ws.on('open', function open() {
    console.log("connection open");
});

ws.on('message', function incoming(data) {
    var data = JSON.parse(data.toString());

    console.log(data.p);

});