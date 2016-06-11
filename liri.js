//required dependencies
var keys = require("./keys.js");
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
//arguement variables
var command = process.argv[2];
var query;
//test for existance of second arguement
if(process.argv.length > 3)
{
     query = process.argv[3];
}
else
{
    query = null;
}

start();

function start(){
    switch(command)
    {
        case 'my-tweets':
            tweet();
        break;
        case 'spotify-this-song':
            song();
        break;
        case 'movie-this':
            movie();
        break;
        case 'do-what-it-says':
            textCommand();
        break;
        default:
            console.log("not a valid command, please try again.");
    }
}

 
 //twitter API call
 function tweet(){
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'SoupeChaude'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        console.log(" ");
        for(var i = 0; i < tweets.length; i++)
        {
            console.log(tweets[i].text + " " + tweets[i].created_at);
        }
        console.log(" ");
    }
    });
}
//Spotify API call
function song(){
        var songTitle = "What's my age again";
        if(query != null)
        {
                songTitle = query;
        }
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(" ");
        for(var i = 0; i < data.tracks.items.length; i ++)
        {
                console.log(" ");
            console.log(data.tracks.items[i].artists[0].name);
            console.log(data.tracks.items[i].name);
            console.log(data.tracks.items[i].preview_url);
            console.log(data.tracks.items[i].album.name);
        }
    });
}
  //OMDB API call
function movie (){
    var movieTitle = "Mr. Nobody";
    if(query != null)
    {
        movieTitle = query;
    }
    var url = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json&tomatoes=true';
    
    request(url, function(err, response, body){
        body = JSON.parse(body);
        console.log(" ");
        console.log(body.Title);
        console.log(body.Year);
        console.log(body.imdbRating);
        console.log(body.Country);
        console.log(body.Plot);
        console.log(body.Actors);
        console.log(body.tomatoRating);
        console.log(body.tomatoURL);
    });
}
//command from file option
function textCommand()
{
  fs.readFile('random.txt', 'utf8', function(err, data){
  if (err)
	{
		console.log(err);
	}
    var fileCommand = data.split(',');  
    command = fileCommand[0];
    if(process.argv.length > 1)
    {
        query = fileCommand[1];
    }
    else
    {
        query = null;
    }
    start();
  });
    
}