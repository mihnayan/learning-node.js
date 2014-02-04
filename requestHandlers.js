var querystring = require("querystring");
var simpleView = require("./simpleView");

function start (response, postData) {
    console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(simpleView.startView());
    response.end();
}

function upload (response, postData) {
    console.log("Request handler 'upload' was called.");
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(simpleView.uploadView({
        sent_text: querystring.parse(postData).text}));
    response.end();
}

exports.start = start;
exports.upload = upload;