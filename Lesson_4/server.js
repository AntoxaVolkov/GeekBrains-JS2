const express = require('express');
const bp = require('body-parser');
const path = require("path");
const cors = require('cors');
const fs = require('fs');
const app = express();

let cities = [];


app.use(cors());
app.use(express.static('public'));
app.use(bp.json());
app.use(bp.text());

fs.readFile('cities.json', 'utf8', (error, data) => {
	cities.concat(JSON.parse(data));
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/assets/:file', (req,res) => {
	res.sendFile(path.join(__dirname + '/public/' + req.params.file));
});



app.get('/cities/:str', (req, res) => {
	let str = req.params.str;
	if (cities.length === 0) {
		fs.readFile('cities.json', 'utf8', (error, data) => {
			cities = JSON.parse(data).city;
			let newCities = findCity(str, cities);
			if(newCities.length > 0){
				res.send(newCities);
			}else{
				res.status(404);
				res.send({
					error: 'Город не найден'
				});
			}
		});
	} else {
		let newCities = findCity(str, cities);
		if (newCities.length > 0) {
			res.send(newCities);
		} else {
			res.status(404);
			res.send({
				error: 'Город не найден'
			});
		}
	}
});

function findCity(str, cities){
	let reg = new RegExp('^'+str,'gmi');
	return cities.filter((city) => reg.test(city.name));
}
app.listen(3001, () => {
	console.log('Server start: localhost:3001')
});