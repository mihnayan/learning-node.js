function start () {
    console.log("Request handler 'start' was called.");
    return "Hello from Start handler! :-) ";
}

function upload () {
    console.log("Request handler 'upload' was called.");
    return "Hello from Upload handler! ;-)";
}

exports.start = start;
exports.upload = upload;