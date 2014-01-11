function route (handle, pathname) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    } else {
        console.log("No request handler found for " + pathname + "!");
        return "Error 404! Page was not found!"
    }
}

exports.route = route;