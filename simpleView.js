var jade = require("jade");

function startView (a_params) {

    return jade.renderFile('jade_tmpl/views/start.jade', 
        {
            pretty: true, 
            form_action: "/upload", 
            submit_text: "Send text"
        },
        function (err, html) {
            if (err) throw err;
            return html;
    });
}

function uploadView (a_params) {
    var params = applyParams(a_params, {sent_text: 'none'});

    return jade.renderFile('jade_tmpl/views/upload.jade', 
        {
            pretty: true,
            sent_text: params.sent_text,
        }, 
        function (err, html) {
            if (err) throw err;
            return html;
    });
}

exports.startView = startView;
exports.uploadView = uploadView;

function applyParams (a_params, a_defaults) {
    var params = a_params || {};
    var defaults = a_defaults || {};
    for (key in params)
        if (key in defaults) defaults[key] = params[key];
    return defaults;
}
