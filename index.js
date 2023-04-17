const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const key = '7c07d5e8adfc763af2888eb45cdc28a5';
let city = 'Tartu';
app.get('/', (req, res) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then((response) => {
        return response.json();
    }).then((data) => {
        let description = data.weather[0].description;
        let city = data.name;
        let temp = data.main.temp;
        res.render('index', {description: description, city: city, temp: temp});
    });
});

app.post('/', (req, res) => {
    let city = req.body.cityname;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then((response) => {
        return response.json();
    }).then((data) => {
        let description = data.weather[0].description;
        let city = data.name;
        let temp = data.main.temp;
        res.render('index', {description: description, city: city, temp: temp});
    });
});
app.listen(3000);