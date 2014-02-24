function route (handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    var path_parts = pathname.match(/\/[\w-.]+/g) || ["/"];
    if (typeof handle[path_parts[0]] === 'function') {
        handle[path_parts[0]](response, request, path_parts);
    } else {
        handle['error404'](response, pathname);
    }
}

exports.route = route;