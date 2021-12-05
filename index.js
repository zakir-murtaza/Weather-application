
import { readFileSync } from 'fs';
import  {createServer } from 'http';


const homeFile = readFileSync("home.html", "utf-8");
const replaceValue = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
}
const server = createServer((req, res) => {
    if(req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=pune&appid=99c58f3ef964f351394535bdb9c8d4d0')
        .on('data', (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
      //  console.log(arrData[0].main.temp);
        const realTimeData = arrData.map(val => replaceValue(homeFile, val)).join("");
       // console.log(realTimeData);
        res.write(realTimeData);           
        })
        .on('end', (err) => {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
});


    }

})  

server.listen(3000,'127.0.0.1');{
    console.log("server is created successfully");
}