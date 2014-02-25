var querystring = require("querystring");
var simpleView = require("./simpleView");
var fs = require("fs");
var path = require("path");
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
    form.on('file', function (name, file) {
        if (!isValidExtension(file.name)) {
            fs.unlink(file.path, function (err) {
                if (err) throw err;
                console.log("file unlinked");
                error404(response, file.name);
            });
        } else {
            // extract file name was generated formidable
            var imgFile = path.basename(file.path);

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(simpleView.uploadedImgView({
                img_path: "/images/" + imgFile,
            }));
            response.end();
        }
    });

    console.log("about to parse form");
    form.parse(request, function (error, fields, files) {
        if (error) {
            console.log("Attention! " + error.message);
            throw error;
        }
        console.log("parsing form done");
        console.log(files);
    })
}

exports.getImage = function (response, request, path_parts) {
    var imgPath = '.' + path_parts.join('');
    console.log("Request handler 'getImage' was called. "
        + "Finding for " + imgPath + " file");

    fs.readFile(imgPath, "binary", function(error, file) {
        if (error) {
            error404(response, imgPath);
            return;
        }
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
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

var isValidExtension = function (fileName) {
    var validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    var ext = path.extname(fileName).substring(1);
    return validExtensions.indexOf(ext) !== -1;
};

exports.start = start;
exports.upload = upload;
exports.inputImg = inputImg;
exports.uploadImg = uploadImg;
exports.error404 = error404;