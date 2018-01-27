require('dotenv').config()

const action = process.argv[2];
const value = process.argv[3];
const Twitter = require('twitter');
const request = require('request');
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const params = {
    screen_name: "wlees001",
    count: 2
}
console.log(keys.omdb);

var client = new Twitter(keys.twitter);
var omdbKey = keys.omdb.api_key;
var spotify = new Spotify(keys.spotify);
const fs = require('fs');

switch (action) {
    case 'mytweets':
    myTweets();
    break;
    case 'spotify':
    spotifyThis(value);
    break;
    case 'omdb':
    omdbThis(value);
    break;
    case 'random':
    random();
    break;
}

function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', ('==Log Entry==\r \n' + Date() + '\r \nTerminal Commands:\r \n$: ' + process.argv + '\r \n   \r \nData Output:\r \n'), function(err)
 {
     if (err) throw err;
 });
 console.log(' ');
 console.log(myTweets());
 for ( i= 0; i < tweets.length; i++) {
     const number = i + 1;
     console.log(' ');
     console.log([i + 1] + '. ' + tweets[i].text);
     console.log('Created on: ' + tweets[i].created_at);
     console.log(' ');
     fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
         if (err) throw err;
     });
 }
 fs.appendFile('terminal.log', ('== Log End ==\r\n \r\n'), function(err) {
     if (err) throw error;
 });
        }
    })
};

function spotifyThis(value) {
    if (value == null) {
        value = 'Happy face';
    }
    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log(' ');
      });
};



function omdbThis(value) {
    if (value == null) {
        value = 'inception';
    }
    var banana = 'http://www.omdbapi.com/?apikey=f5b55054&'
    + value;
    console.log(banana)
    request(banana, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country : ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);   
        } else {
            console.log(error);
        }
    })
}
