var store = require("../model/model.js");
var bodyParser = require('body-parser');

module.exports.showIndex = function (req, res) {
    var testArray = { title: 'test', todos: [{name: "deine mudda"},{name: "dini muetter"}]};
    res.render('index', testArray);
}

module.exports.showAllNotices = function(req, res) {
    store.all(function(err, notices) {
        console.log(notices);
    })
}

module.exports.showNotice = function(req, res) {
    store.get(req.params.id, function(err, notice) {
        console.log(notice);
    })
}

module.exports.saveNotice = function(req, res) {
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
    //Todo:
}

module.exports.deleteNotice =  function (req, res)
{
    store.delete(req.params.id , function(err, notice) {
        //Todo:
    });
};

module.exports.showTodo = function (req, res) {
    res.render('todo');
}


