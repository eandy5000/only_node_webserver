var Profile = require('./profile');

function home(req, res){

    if(req.url === "/"){ 
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Header\n");
        res.write("Search\n");
        res.end("Footer\n");
    }
};

function about(req, res){
    if(req.url === "/about"){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("About\n");
        res.end("content\n");
    }
}

function user(req, res){
    var username = req.url.replace("/", "");
    if (username.length > 0 ){
        res.writeHead(200, {"Content-Type": "text/plain"});
        var studentProfile = new Profile(username);
        studentProfile.on("end", function(profileJSON){
            var values = {
                username : profileJSON.profile_name,
                badges: profileJSON.badges.length,
                jsPoints: profileJSON.points.JavaScript
            }
            res.write(values.username + " " +values.badges +"\n");
            res.end(values.jsPoints + " JS\n");
        });
        studentProfile.on("error", function(err){
            res.end(err.message);
        });
        
    }
}

module.exports = {
    home: home,
    about: about,
    user: user
}