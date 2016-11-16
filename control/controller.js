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

module.exports.createNotice = function(req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function (err, notice) {
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

