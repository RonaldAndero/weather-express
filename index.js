const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const key = '7c07d5e8adfc763af2888eb45cdc28a5';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            let description = data.weather[0].description;
            let city = data.name;
            let temp = data.main.temp;
            let result = {description: description, city: city, temp: temp};
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    })
}
app.all('/', (req, res) => {
    let city
    if(req.method === 'GET') {
        city = 'London';
    }
    if(req.method === 'POST') {
        city = req.body.cityname;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    getWeatherDataPromise(url).then(data => {
        res.render('index', data);
    }).catch(err => {
        console.log(err);
    });
});
app.listen(3000);