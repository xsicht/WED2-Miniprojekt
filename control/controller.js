var store = require("../model/model.js");
var bodyParser = require('body-parser');
var sass = require('node-sass');

module.exports.showIndex = function (req, res) {
    store.all(function(err, notices) {
        var data ={};
        var itemsLength = Object.keys(notices).length;
        //res.render('index' , data || {}); geht nicht weil data immer inhalt hat {[]}
        if (itemsLength == 0){
            res.render('index');
        } else{
            data.todo = notices;
            res.render('index' , data);
        }
    });
};

module.exports.showSorted = function(req, res) {
    store.all(function(err, notices) {
        var data = {};
        data.todo = notices;
        switch(req.params.sorting) {
            case "byFinishDate":
                data.todo.sort(function (a, b) {
                    return Date.parse(a.until) - Date.parse(b.until);
                });
                break;
            case "byCreationDate":
                data.todo.sort(function (a, b) {
                    return Date.parse(a.created) - Date.parse(b.created);
                });
                break;
            case "byImportance":
                data.todo.sort(function (a, b) {
                    return parseFloat(a.importance) - parseFloat(b.importance);
                });
                break;
            case "byCompletion":
                data.todo = data.todo.filter(function (i){
                    return i.done=="true";
                });
                break;
        }
        res.render('index', data);
    });
};

module.exports.showNotice = function(req, res) {
    store.get(req.params.id, function(err, notice) {
        err? res.end("FAIL"): res.end("OK");
    });
};

module.exports.saveNotice = function(req, res) {
    var todoTitle = req.body.title;
    var todoDescription = req.body.description;
    var todoImportance = req.body.importance;
    var todoUntil = req.body.until;
    var todoCreated = new Date().toString();
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

module.exports.newTodo = function (req, res) {
    res.render('todo');
};

module.exports.showTodo = function (req, res) {
    console.log("edit Todo");
    store.get(req.params.id, function(err, data) {
        res.render('todo', data);
    });
};

module.exports.switchStyle = function (req, res) {
     store.all(function(err, notices) {
        var data ={};
        var items = Object.keys(notices).length;
        if (items == 0){
            res.render('index');
        } else{
            data.todo = notices;
            dynamicSass('style.scss', {
                'colorBackground': 'blue'
            }, res.render('index' , data));
        }
    });
};

var sassOptionsDefaults = {
    includePaths: [
        'style.scss'
    ],
    outputStyle: 'compressed'
};

function dynamicSass(scssEntry, variables, handleSuccess) {
    var dataString =  sassVariables(variables) + "@import '" + scssEntry  + "';";
    var sassOptions = Object.assign({}, sassOptionsDefaults, {
        data: dataString
    });

    sass.render(sassOptions, function (err, result) {
        console.log(sassOptions);
        return handleSuccess(result.css.toString());
    });
}


function sassVariable(name, value) {
    return "$" + name + ": " + value + ";";
}

function sassVariables(variablesObj) {
    return Object.keys(variablesObj).map(function (name) {
        return sassVariable(name, variablesObj[name]);
    }).join('\n')
}
