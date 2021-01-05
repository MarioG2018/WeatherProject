const express=require("express");
const app=express()
const https=require("https");
app.get("/",function(req,res)
{
res.sendFile(__dirname +"/index.html");

})
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));





 app.post("/",function(req,res)
 {
   const query=req.body.CityName;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+",us&units=imperial&appid=e51deeb4f5ce79e720aec62a75b11e27";
   https.get(url,function(response)
   {
   console.log(response.statusCode);
   response.on("data",function(data)
   {
   const weatherData=JSON.parse(data);
   const des=weatherData.weather[0].description;
   const temp=weatherData.main.temp;
   const icon=weatherData.weather[0].icon;
   const name=weatherData.name;
   const coutry=weatherData.sys.country;
   const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
   //res.send("The temperature is "+temp+"F ");
   res.set('Content-Type', 'text/html');
   res.write("<h1>The weather is currently "+des+" </h1>");
   res.write("<h1>the temperature is "+temp+"degrees</h1>");
   res.write("<h1>in "+name+","+coutry+"</h1>");
   res.write("<img src="+imageURL+">");
   res.send();
   })

   })
 })

 let port = process.env.PORT;
 if (port == null || port == "") {
   port = 3000;
 }
 app.listen(port, function() {
   console.log("Server has started Successfully");
 });
