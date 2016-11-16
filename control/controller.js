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

module.exports.showSorted = function(req, res) {
    store.all(function(err, notices) {
        var todos = notices;
        switch(req.params.sorting) {
            case "byFinishDateAsc":
                todos.sort(function (a, b) {
                    return parseFloat(a.until) - parseFloat(b.until)
                });
            case "byCreationDateAsc":
                todos.sort(function (a, b) {
                    return parseFloat(a.created) - parseFloat(b.created)
                });
            case "byImportanceAsc":
                todos.sort(function (a, b) {
                    return parseFloat(a.importance) - parseFloat(b.importance)
                });
            case "byCompletionAsc":
                todos.sort(function (a, b) {
                    return parseFloat(a.done) - parseFloat(b.done)
                });
            case "byFinishDateDsc":
                todos.sort(function (a, b) {
                    return parseFloat(b.until) - parseFloat(a.until)
                });
            case "byCreationDateDsc":
                todos.sort(function (a, b) {
                    return parseFloat(b.created) - parseFloat(a.created)
                });
            case "byImportanceDsc":
                todos.sort(function (a, b) {
                    return parseFloat(b.importance) - parseFloat(a.importance)
                });
            case "byCompletionDsc":
                todos.sort(function (a, b) {
                    return parseFloat(b.done) - parseFloat(a.done)
                });
        }
        ascending = !ascending;
        console.log(todos);
        console.log(ascending);
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
    var todoCreated = new Date().toString();
    var todoDone = req.body.done;
    store.add(todoTitle, todoDescription, todoImportance, todoUntil, todoCreated, todoDone, function (err, notice) {
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


