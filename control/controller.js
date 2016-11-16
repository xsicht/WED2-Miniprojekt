var store = require("../model/model.js");
var bodyParser = require('body-parser');

module.exports.showIndex = function (req, res) {
    store.all(function(err, notices) {
        res.render('index', notices);
    });
}

module.exports.showAllNotices = function(req, res) {
    store.all(function(err, notices) {
        var todos = notices;
        res.render('index', todos);
    });
}

module.exports.showNotice = function(req, res) {
    store.get(req.params.id, function(err, notice) {
        err? res.end("FAIL"): res.end("OK");
    });
}

module.exports.createNotice = function(req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function (err, notice) {
        err? res.end("FAIL"): res.end("OK");
    });
}

module.exports.updateNotice = function(req, res) {
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function(err, notice){
        err? res.end("FAIL"): res.end("OK");
    });
}

module.exports.deleteNotice =  function(req, res) {
    store.delete(req.params.id , function(err, notice) {
        err? res.end("FAIL"): res.end("OK");
    });
};

