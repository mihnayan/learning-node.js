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
    var jadeParams = {
            pretty: true,
            form_action: "/uploadimg",
            submit_text: "Upload file"
        };
    var params = applyParams(a_params, jadeParams);

    return jade.renderFile('jade_tmpl/views/inputimg.jade', params,
        function (err, html) {
            if (err) throw err;
            return html;
        });
}

function uploadedImgView (a_params) {
    var params = applyParams(a_params, {img_path: "#"});

    return jade.renderFile('jade_tmpl/views/uploadedimg.jade',
        {
            pretty: true,
            img_path: params.img_path,
            status: 'error',
            status_text: 'something error!'
        },
        function (err, html) {
            if (err) throw err;
            return html;
        });
}

function error404View (a_params) {
    var params = applyParams(a_params, {requested_page: ''});

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
exports.uploadedImgView = uploadedImgView;
exports.error404View = error404View;

function applyParams (a_params, a_defaults) {
    var params = a_params || {};
    var defaults = a_defaults || {};
    for (key in params)
        defaults[key] = params[key];
    return defaults;
}
