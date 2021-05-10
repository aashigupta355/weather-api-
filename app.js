const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    //console.log(req.body.cityName);
    var query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c1f917fa1115bc615e4f47d29a3e1684&units=metric";
    https.get(url,function(response){ //will make a connection to the external server
        console.log(response.statusCode);
        response.on("data",function(data){
            //console.log(data);
            var jsonData=JSON.parse(data);
            //console.log(jsonData); prints the whole json data

            //We want to print only the temperature value
            var temp=jsonData.main.temp;
            console.log(temp);

            //We want to print the description of the jsonData
            var desc=jsonData.weather[0].description;
            console.log(desc);
            
            const icon=jsonData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The current temperature in "+query+" is "+temp+" degree celcius</h1>");
            res.write("<h3>The weather description is as follows :- "+desc+"</h3>");
            res.write("<img src='"+imageURL+"'>");
            res.send();
        });
    });
    //res.send("Hey the server is running and ready"); //It will send the data to the browser
});

/*const url="https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=c1f917fa1115bc615e4f47d29a3e1684&units=metric";
    https.get(url,function(response){ //will make a connection to the external server
        console.log(response.statusCode);
        response.on("data",function(data){
            //console.log(data);
            var jsonData=JSON.parse(data);
            //console.log(jsonData); prints the whole json data

            //We want to print only the temperature value
            var temp=jsonData.main.temp;
            console.log(temp);

            //We want to print the description of the jsonData
            var desc=jsonData.weather[0].description;
            console.log(desc);
            
            const icon=jsonData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The current temperature in Paris is "+temp+" degree celcius</h1>");
            res.write("<h3>The weather description is as follows :- "+desc+"</h3>");
            res.write("<img src='"+imageURL+"'>");
            res.send();
        });
    });
    //res.send("Hey the server is running and ready"); //It will send the data to the browser*/
app.listen('3000',function(req,res){
    console.log("The server is running on port: 3000");
});