var querystring = require("querystring");
var simpleView = require("./simpleView");
var fs = require("fs");
var formidable = require("formidable");

function start (response, request) {
    console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(simpleView.startView());
    response.end();
}

function upload (response, request) {
    console.log("Request handler 'upload' was called.");

    request.setEncoding("utf8");
    var postData = '';

    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '" + postDataChunk + "'.");
    });
    
    request.addListener("end", function () {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(simpleView.uploadView({
            sent_text: querystring.parse(postData).text
        }));
        response.end();
    });
}

function inputImg (response, request) {
    console.log("Request handler 'inputimg' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(simpleView.inputImgView());
    response.end();
}

function uploadImg (response, request, path_parts) {
    console.log("Request handler 'uploadimg' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/images";
    form.keepExtensions = true;

    console.log("about to parse form");
    form.parse(request, function (error, fields, files) {
        if (error) console.log(error.message);
        console.log("parsing form done");
        console.log(files);

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(simpleView.uploadedImgView({
            img_path: "/images/" + files.upload.name,
        }));
        response.end();
    })
}

function error404 (response, pathname) {
    console.log("No request handler found for " + pathname + "!");

    response.writeHead(404, {"Content-Type" : "text/html"});
    response.write(simpleView.error404View({
        requested_page: pathname,
    }));
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.inputImg = inputImg;
exports.uploadImg = uploadImg;
exports.error404 = error404;