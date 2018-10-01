var token = require('./token');
var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
	request.get(url)
	       .on('error', function (err) {
	         throw err; 
	       })
	       .on('response', function (response) {
	         console.log('Response Status Code: ', response.statusCode);
	       })
	       .pipe(fs.createWriteStream(filePath));
	};

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token 1f9cf1dae48b861e7d58f6fb362a1f1140e99f54'
    }
  };



  let test = request.get(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) throw err
  let results = JSON.parse(result);
	for (let result of results) {
		downloadImageByURL(result.avatar_url, `avatars/${result.login}.jpg`);
	}
})