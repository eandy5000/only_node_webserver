var Profile = require('./profile');
var renderer = require('./renderer');
var querystring = require('querystring');

var commonHeaders = {"Content-Type": "text/html"}

function home(req, res){

    if(req.url === "/"){ 
        if(req.method.toLowerCase() === "get"){
            res.writeHead(200, commonHeaders);
            renderer.view("header", {}, res);
            renderer.view("search", {}, res);
            renderer.view("footer", {}, res);
            res.end();
        } else {
            req.on("data", function(postBody){
                var query = querystring.parse(postBody.toString());
                res.writeHead(303, {Location : "/" + query.username});
                //res.write(query.username);
                res.end();
            });
        }
    }
};

function about(req, res){
    if(req.url === "/about"){
        res.writeHead(200, commonHeaders);
        res.write("About\n");
        res.end("content\n");
    }
}

function user(req, res){
    var username = req.url.replace("/", "");
    if (username.length > 0 ){

            res.writeHead(200, commonHeaders);
            var studentProfile = new Profile(username);
            studentProfile.on("end", function(profileJSON){
                
                var values = {
                    username : profileJSON.profile_name,
                    badges: profileJSON.badges.length,
                    jsPoints: profileJSON.points.JavaScript
                }

                renderer.view("header", {}, res);
                renderer.view("profile", values, res);
                res.end();
                
        });
        studentProfile.on("error", function(err){
            renderer.view("header", {}, res);
            renderer.view("error", {errorMessage: err.message}, res);
            renderer.view("footer", {}, res);
            res.end();
        });
        
    }
}

module.exports = {
    home: home,
    about: about,
    user: user
}