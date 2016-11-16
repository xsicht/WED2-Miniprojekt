var express = require('express');
var router = express.Router();
var notices = require('../control/controller');

router.get("/", notices.showIndex);
router.get("/notices", notices.showAllNotices);
router.post("/notices/:id/", notices.updateNotice);
router.post("/notices/sort/:sorting/", notices.showSorted);
router.delete("/notices/:id/", notices.deleteNotice);

router.get("/todo", notices.newTodo);
router.post("/todo", notices.saveNotice);
router.get("/todo/:id/", notices.showTodo);
router.post("/todo/:id/", notices.updateNotice);

module.exports = router;