var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/inputimg"] = requestHandlers.inputImg;
handle["error404"] = requestHandlers.error404;

server.run(router.route, handle);