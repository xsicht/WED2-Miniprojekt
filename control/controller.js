var store = require("../model/model.js");
var bodyParser = require('body-parser');
var sass = require('node-sass');
var style = "";
var mom = require('moment');

module.exports.showIndex = function (req, res) {
    store.all(function(err, notices){
        var data = {};
        data.todo = notices;
        data.style = req.session.style;

                if(req.session.sortedByFinishDateDsc){
                    data.todo.sort(function (a, b) {
                        return mom(a.until) > mom(b.until);
                    });
                }
                if(req.session.sortedByFinishDateAscs){
                    data.todo.sort(function (a, b) {
                        return mom(a.until) < mom(b.until);
                    });
                }

                if(req.session.sortedByCreationDateDsc){
                    data.todo.sort(function (a, b) {
                        return mom(a.created) > mom(b.created);
                    });
                }
                if(req.session.sortedByCreationDateAsc){
                    data.todo.sort(function (a, b) {
                        return mom(a.created) < mom(b.created);
                    });
                }

                if(req.session.sortedByImportanceDsc){
                    data.todo.sort(function (a, b) {
                        return Date.parse(a.importance) - Date.parse(b.importance);
                    });
                }
                if(req.session.sortedByImportanceAsc){
                    data.todo.sort(function (a, b) {
                        return Date.parse(b.importance) - Date.parse(a.importance);
                    });
                }
                if(req.session.sortedByCompletion) {
                    data.todo = data.todo.filter(function (i){
                        return i.done=="true";
                    });
                }

             if (Object.keys(data.todo).length != 0) {
                    data.todo = dateFormat(data.todo);
             }
             res.render('index' , data);
        });
};

module.exports.showSorted = function(req, res) {
        switch(req.params.sorting) {
            case "byFinishDate":
                if(req.session.sortedByFinishDateDsc){
                    resetSorting(req);
                    req.session.sortedByFinishDateAsc = true;
                }
                else {
                    resetSorting(req);
                    req.session.sortedByFinishDateDsc = true;
                }
                break;

            case "byCreationDate":
                if(req.session.sortedByCreationDateDsc){
                    resetSorting(req);
                    req.session.sortedByCreationDateAsc = true;
                }
                else {
                    resetSorting(req);
                    req.session.sortedByCreationDateDsc = true;
                }
                break;

            case "byImportance":
                if(req.session.sortedByImportanceDsc){
                    resetSorting(req);
                    req.session.sortedByImportanceAsc = true;
                }
                else {
                    resetSorting(req);
                    req.session.sortedByImportanceDsc = true;
                }
                break;

            case "byCompletion":
                if(req.session.sortedByCompletion) {
                    resetSorting(req);
                }
                else {
                    resetSorting(req);
                    req.session.sortedByCompletion = true;
                }
                break;
        }

        res.redirect('/')
};

module.exports.saveNotice = function(req, res) {
    var todoTitle = req.body.title;
    var todoDescription = req.body.description;
    var todoImportance = req.body.importance;
    var todoUntil = new Date(req.body.until);
    var todoCreated = new Date();
    var todoDone = false;
    store.add(todoTitle, todoDescription, todoImportance, todoUntil, todoCreated, todoDone, function (err, notice) {
        res.redirect("/");
    })
};

module.exports.updateNotice = function(req, res) {
    console.log("update Notice");
    console.log(req.params.id);
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function(err, notice){
        res.redirect("/");
    });
};

module.exports.deleteNotice =  function(req, res) {
    store.delete(req.params.id , function(err, notice) {
        res.redirect("/");
    });
};

module.exports.showTodo = function (req, res) {
    store.get(req.params.id, function(err, data) {
        if(data == null){
            var data = {};
        }
        data.style = req.session.style;
        res.render('todo', data);
    });
};

module.exports.switchStyle = function (req, res) {
    if (req.session.style == "alt") {
        req.session.style = "";
    } else {
        req.session.style = "alt";
    }
    res.redirect("/");
};

function resetSorting(req){
    req.session.sortedByFinishDateAsc = false;
    req.session.sortedByFinishDateDsc = false;
    req.session.sortedByCreationDateAsc = false;
    req.session.sortedByCreationDateDsc = false;
    req.session.sortedByImportanceAsc = false;
    req.session.sortedByImportanceDsc = false;
    req.session.sortedByCompletion = false;
}

function dateFormat(date){
    for(i in date){
        date[i].until = mom(date[i].until).format('L');
        date[i].created = mom(date[i].created).format('L');
    }
    return date;
}
