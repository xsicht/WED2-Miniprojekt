var store = require("../model/model.js");
var bodyParser = require('body-parser');

module.exports.showIndex = function (req, res) {
    store.all(function(err, notices) {
        console.log(notices);
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

module.exports.saveNotice = function(req, res) {
    console.log("add Notice");
    var todoTitle = req.body.title;
    var todoDescription = req.body.description;
    var todoImportance = req.body.importance;
    var todoUntil = req.body.until;
    var todoDone = req.body.done;
    store.add(todoTitle,todoDescription,todoImportance,todoUntil,todoDone, function (err, notice) {
        //ToDo:
    })
}

module.exports.updateNotice = function(req, res) {
    console.log("update Notice");
    console.log(req.params.id);
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function(err, notice){
        err? res.end("FAIL"): res.end("OK");
    });
}

module.exports.deleteNotice =  function(req, res) {
    store.delete(req.params.id , function(err, notice) {
        err? res.end("FAIL"): res.end("OK");
    });
};

module.exports.newTodo = function (req, res) {
    console.log("new Todo");
    res.render('todo');
}

module.exports.showTodo = function (req, res) {
    console.log("edit Todo");
    store.get(req.params.id, function(err, data) {
        res.render('todo', data);
    });
}


