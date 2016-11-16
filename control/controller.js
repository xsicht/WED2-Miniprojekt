var store = require("../model/model.js");
var bodyParser = require('body-parser');

module.exports.showIndex = function (req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Willkommen!</p>");
    res.write("<form action='/notices' method='get'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
}

module.exports.showAllNotices = function(req, res) {
    //Todo
}

module.exports.showNotice = function(req, res) {
    store.get(req.params.id, function(err, notice) {
        res.type('text/html');
        res.write("<html>");
        if(notice) {
            res.write("<p>Notice-Number: " + notice._id + "</p>");
            res.write("<p>Status: " + notice.state + "</p>");
            if(notice.state == "OK") {
                res.write("<form action='/notices/" + notice._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
            }
        }
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    })
}

module.exports.createNotice = function(req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.until, req.body.done, function (err, notice) {
        console.log(req.body.title);
        console.log(req.body.description);
        console.log(req.body.importance);
        console.log(req.body.until);
        console.log(req.body.done);
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Erfolgreich!</p>");
        res.write("<p>Ihre Notiz: " + notice.title + "</p>");
        res.write("<p>Ihre Nummer: " + notice._id + " !</p>");
        res.write("<p><a href='/notices/" + notice._id + "/'>Zeige Notiz an</a></p>");
        res.end("</html>");
    })
}

module.exports.updateNotice = function(req, res) {
    //Todo:

}

module.exports.deleteNotice =  function (req, res)
{
    store.delete(req.params.id , function(err, notice) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Notice-Number: " + notice._id + "</p>");
        res.write("<p>Status: " + notice.state + "</p>");
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};

