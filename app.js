const express = require("express");
const https = require("https");
const { dirname } = require("path");
const bodyparser =require("body-parser");


const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function (req, res){
    
   res.sendFile(`${__dirname}/index.html`)
})

app.post("/", function(req, res){
    console.log("post request recived");
    console.log(req.body.cityname);
    
    const query = req.body.cityname;
    const apikey = "843c12179280a30e0d74b5667a3a9d5d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric"

https.get(url, function(response){
    console.log(response.statusCode);
    
    response.on("data", function(data) {
        
        const weatherData = JSON.parse(data)
        
        const temp = weatherData.main.temp;
        
        const des = weatherData.weather[0].description
        const ic = weatherData.weather[0].icon
        const imageURl ="http://openweathermap.org/img/wn/"+ic+"@2x.png"
        res.write("<p>The weather is currently "+des+"<P>")
        res.write("<h1>The temperature feels like in "+query+" is " + temp +" degree Celcius</h1>");
        res.write("<img src="+imageURl+">")
        res.send()
    })
})
})


app.listen(3000, function () {
    console.log("ports working in 3000");
})


