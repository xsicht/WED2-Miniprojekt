var Datastore = require('nedb');
var db = new Datastore({ filename: './data/data.db', autoload: true });

function Notice(title, description, importance, until, done) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.until = until;
    this.done = done;
}

function publicFindAllNotices(callback) {
    db.find({}, function (err, doc) {
        if(callback) {
            callback(err, doc);
        }
    });
}

function publicGetNotice(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        if(callback) {
            callback(err, doc);
        }
    });
}

function publicAddNotice(title, description, importance, until, created, done, callback) {
    var notice = new Notice(title, description, importance, until, created, done);
    db.insert(notice, function (err, doc) {
        if(callback) {
            callback(err, doc);
        }
    });
}

function publicDelete(id, callback) {
    db.remove({_id: id}, {}, function (err, doc) {
        if(callback) {
            callback(err, doc);
        }
    });
}

function publicUpdate(id, title, description, importance, until, done, callback) {
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "until": until, "done": done}}, function(err, doc){
        if(callback) {
            callback(err, doc);
        }
    });
}

module.exports = {add : publicAddNotice, delete : publicDelete, update: publicUpdate, get : publicGetNotice, all : publicFindAllNotices};