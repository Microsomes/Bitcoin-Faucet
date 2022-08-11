const WebSocket = require('ws');

const PORT = process.env.PORT || 3001;

const server = new WebSocket.Server({ port: PORT });
const client = require("ws").WebSocket

const bitcoinPriceStream = "wss://stream.binance.com:9443/ws/btcbusd@aggTrade";



var btcPrice = 0;

//average btcusd price
const ws = new client(bitcoinPriceStream,{
    perMessageDeflate: false
});

ws.on('open', function open() {
    console.log("connection open");
});

ws.on('message', function incoming(data) {
    var data = JSON.parse(data.toString());
    btcPrice = data.p;
});



//cors allow all

let sockets = [];

 


server.on('connection', function(socket) {
    
    sockets.push(socket);

    setInterval(()=>{
        socket.send(btcPrice);
    },1000)
    
    // When you receive a message, send that message to every socket.
    socket.on('message', function(msg) {
        var command = JSON.parse(msg.toString());
    });
  
    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function() {
      sockets = sockets.filter(s => s !== socket);
    });
  });