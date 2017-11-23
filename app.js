const express = require('express');
const scraperjs = require('scraperjs');

const app = express();

let newsFromAB = [];
let newsFromDN = [];

async function scrapeAftonbladet() {
	let ab = scraperjs.StaticScraper.create('https://aftonbladet.se');

	let news = await ab.scrape(function($) {
	    return $('a[href*="/nyheter"]').map(function() {
	        return {
	        	text: $(this).closest('h3').text(),
	        	url: 'https://aftonbladet.se' + $(this).attr('href');
	    }).get();
	});
	newsFromAB = news;
}

async function scrapeDN() {
	let ab = scraperjs.StaticScraper.create('https://dn.se');

	let news = await ab.scrape(function($) {
	    return $('a[href*="/nyheter"]').map(function() {
	        return {
	        	text: $(this).closest('h3').text(),
	        	url: 'https://dn.se' + $(this).attr('href');
	    }).get();
	});
	newsFromDN = news;
}

scrapeAftonbladet();
setInterval(scrapeAftonbladet, 60 * 1000);

scrapeDN();
setInterval(scrapeDN, 60 * 1000);

app.get('/ab-news', (req, res) => {
	res.json(newsFromAB);
});

app.get('/dn-news', (req, res) => {
	res.json(newsFromDN);
});

app.get('/all-news', (req, res) => {
	res.json(newsFromAB + newsFromDN);
});

app.listen(3000,() => console.log("Listening on port 3000."));