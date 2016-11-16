var Datastore = require('nedb');
var db = new Datastore({ filename: './data/data.db', autoload: true });

function Notice(title, description, importance, until, done) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.until = until;
    this.done = done;
    this.state = "OK";
}

function publicFindAllNotices(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

function publicGetNotice(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}

function publicAddNotice(title, description, importance, until, done, callback) {
    var notice = new Notice(title, description, importance, until, done);
    db.insert(notice, function (err, newDoc) {
        if(callback) {
            callback(err, newDoc);
        }
    });
}

function publicDelete(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err,doc) {
        publicGetNotice(id, callback);
    });
}

function publicUpdate(id, title, description, importance, until, done, callback) {
    var notice = new Notice(title, description, importance, until, done);
    db.update({_id: id}, notice, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

module.exports = {add : publicAddNotice, delete : publicDelete, get : publicGetNotice, all : publicFindAllNotices};