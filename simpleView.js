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

function inputImgView (a_params) {

    return jade.renderFile('jade_tmpl/views/inputimg.jade',
        {
            pretty: true,
            form_action: "/uploadimg",
            submit_text: "Upload file"
        },
        function (err, html) {
            if (err) throw err;
            return html;
        });
}

function error404View (a_params) {
    var params = applyParams(a_params, {requested_page: 'bla bla'});

    return jade.renderFile('jade_tmpl/views/error404.jade',
        {
            pretty: true,
            page: params.requested_page,
        },
        function (err, html) {
            if (err) throw err;
            return html;
        });
}

exports.startView = startView;
exports.uploadView = uploadView;
exports.inputImgView = inputImgView;
exports.error404View = error404View;

function applyParams (a_params, a_defaults) {
    var params = a_params || {};
    var defaults = a_defaults || {};
    for (key in params)
        if (key in defaults) defaults[key] = params[key];
    return defaults;
}
