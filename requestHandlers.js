var exec = require("child_process").exec;

function start (response) {
    console.log("Request handler 'start' was called.");
    var content = "empty content";

    exec("systeminfo", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });

    function sleep (ms) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + ms);
    }

    // sleep(10000);
    // return "Hello from Start handler! :-) ";
    return content;
}

function upload (response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello from Upload handler! ;-)");
    response.end();
}

exports.start = start;
exports.upload = upload;