var request = require('request');
var fs = require('fs');

let owner = process.argv[2];
let repo = process.argv[3];
var token = require('./token');

console.log(token);

function downloadImageByURL(url, filePath) {
	request.get(url)
	       .on('error', function (err) {
	         throw err; 
	       })
	       .on('response', function (response) {
	         console.log('Downloading ', url);
	       })
	       .pipe(fs.createWriteStream(filePath));
	};

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };

  let test = request.get(options, function(err, res, body) {
    cb(err, body);
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

if (!owner || !repo) throw "Please provide arguments"

getRepoContributors(owner, repo, function(err, result) {
  if (err) throw err
  let results = JSON.parse(result);
	for (let result of results) {
		downloadImageByURL(result.avatar_url, `avatars/${result.login}.jpg`);
	}
})