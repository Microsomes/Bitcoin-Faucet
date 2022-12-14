const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");

const Bitcoin = require('bitcoin-address-generator');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

const oneDay = 1000 * 60 * 60 * 24;



const sessions = require("express-session");

//session middleware
app.use(sessions({
secret: "thisismysecrctekey",
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false
}));


//static
app.use(express.static('public'))

//body parser


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//body parse
app.use(express.json());

const BlockchainHelper = require("./helpers/helper.js")

const bhelper = new BlockchainHelper();

var validateBitcoinAddress = require('bitcoin-address-validation');

//maintains a list of ip addresses who have already claimed funds
var listOfIps = [];

setInterval(()=>{
    //clear list of ips
    listOfIps = []; 
},//1 day
1000*60*60*24)


app.post("/freecoins",(req,res)=>{

    //prevent people from spamming
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    //check if ip is in list
    if(listOfIps.includes(ip)){
        res.send("You have already claimed your free coins");
        return;
    }
    
    //add ip to list
    listOfIps.push(ip);

    const address = req.body.bitcoinaddress;

    //validate the bitcoin address provided is correct
    const isValid = validateBitcoinAddress.validate(address);

    if(req.session.isSent){
        res.json({status: "error", message: "You have already sent coins to this address"});
        return;
    }
    
    if(!isValid){
        res.send("Invalid Bitcoin Address, Please enter a valid address");
    }else{
        //send satoshis to address
        bhelper.sendSatoshis(address,1000).then((result)=>{
            var url = `https://www.blockchain.com/btc/tx/${result.result}`;
            
            req.session.isSent= true;
            req.session.txidurl= url;
            req.session.txid= result.result;
            
            res.redirect("/success");

        }).catch((err)=>{
            res.status(400).send("Error");
        })
     }



 })


 app.get("/generatewallet",(req,res)=>{
    Bitcoin.createWalletAddress(response => {
        console.log(response);
        res.json({
             p: response.key,
             address: response.address
        })
    }); 
 })

 app.get("/freecoinsstatus",(req,res)=>{
    if(req.session.isSent){
        res.json({status: "success",
         message: "Coins sent successfully", 
         txid: req.session.txid, 
         txidurl: req.session.txidurl});
    }else{
        res.json({status: "error", message: "Coins not sent yet"});
    }
 })


 app.get("/headers",(req,res)=>{
    //return request header
    res.json(req.headers);
 })
app.get("/getcurrentblockcount",(req,res)=>{
    bhelper.getCurrentBlockHeight().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })    
})

app.get("/getcurrentblock",(req,res)=>{
    bhelper.getCurrentBlock().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })    
})

app.get("/getlastblock",(req,res)=>{
    bhelper.getLastBlock().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })    
});

app.get("/mining",(req,res)=>{
    res.sendFile(__dirname + "/views/mining.html");
})

app.get("/getbalance",(req,res)=>{
    bhelper.getBalance().then((result)=>{
        res.send(result);
    }
    ).catch((err)=>{
        res.send(err);
    }
    )
})


app.get("/success/",(req,res)=>{
    res.sendFile(__dirname + "/views/success.html");
})

app.all("/",(req,res,next)=>{
    res.sendFile(__dirname+"/views/index.html")
})


app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port localhost:3000');
});