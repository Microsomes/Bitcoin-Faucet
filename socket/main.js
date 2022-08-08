 

 const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

let sockets = [];

var currentDifficulty = 4;

function sendDifficultyToAllConnections(){
    sockets.forEach(function(s) {
        s.send(JSON.stringify({
            type:'difficulty',
            data: currentDifficulty
        }));
    })
}

server.on('connection', function(socket) {
    
    sockets.push(socket);
    
    currentDifficulty+=1 // add 1 to difficulty
    sendDifficultyToAllConnections();
    
  
    // When you receive a message, send that message to every socket.
    socket.on('message', function(msg) {
        var command = JSON.parse(msg.toString());

        if(command.type == "startMining"){
            const address = command.data;
            
            socket.send(JSON.stringify({
                type:'miningStarted',
                data: address,
                difficulty: currentDifficulty
            }));

        }

 
    });
  
    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function() {
      sockets = sockets.filter(s => s !== socket);
      currentDifficulty-=1
      sendDifficultyToAllConnections();
    });
  });