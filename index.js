const express = require('express');
const data = require('./data.json');
const bodyParser = require('body-parser');
server = express();


server.use(express.static('views'));
server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/',(req,res)=>{
    res.render('index',{data:data});
})

server.post('/flight', async(req,res)=>{
    const {source,destination,date} = req.body; 
    const flights = data.flights.filter(flight => flight.source.toLowerCase() === source.toLowerCase().trim() && flight.destination.toLowerCase() === destination.toLowerCase().trim());
    
    if (date) {
        flights = flights.filter((flight) => flight.date === date);
    }
    
    if(flights.length===0)
    {
        res.render('index',{data:{flights:flights}});
    }
    else{
        res.render('index',{data:{flights:flights}});
    }   
})

const port = process.env.port || 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  