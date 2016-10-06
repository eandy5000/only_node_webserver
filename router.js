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
        res.write(username + "\n");
        res.end("content\n");
    }
}

module.exports = {
    home: home,
    about: about,
    user: user
}