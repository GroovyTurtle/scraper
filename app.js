const express = require('express');
const scraperjs = require('scraperjs');

const app = express();
let weatherTD;
let weatherInformation = [];

async function scrapeWeather() {
	let weatherSite = scraperjs.StaticScraper.create('http://www.dmi.dk/vejr/til-lands/byvejr/by/vis/SE/2662149/Ystad,%20Sverige');
	let columnText = ['time', 'degrees', 'rain', 'wind'];
	let informationToPush = {};

	weatherTD = await weatherSite.scrape(function($) {
		return $($('#hour_table table')[0]).find('tbody td').filter(function(index) {
			if (index % 5 === 1) {
				return false;
			}
		});
	});

	for (let i = 0; i < weatherTD.length; i++) {

		let column = i % 4;

		weatherInformation[] = columnText[column];

		if (i === 0 && column === 0) {
			weatherInformation.push(informationToPush);
			informationToPush = {};
		}
	}

	console.log(weatherInformation);
}

scrapeWeather();
setInterval(scrapeWeather, 60 * 1000);

app.get('/weather', (req, res) => {
	res.json('weatherInformation');
});

app.listen(3000,() => console.log("Listening on port 3000."));

//bamsi
