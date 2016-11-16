var express = require('express');
var router = express.Router();
var notices = require('../control/controller');

router.get("/", notices.showIndex);
router.get("/notices", notices.showAllNotices);
router.get("/notices/:id/", notices.showNotice);
router.post("/notices/:id/", notices.updateNotice);
router.delete("/notices/:id/", notices.deleteNotice);

router.get("/todo", notices.showTodo);
router.post("/todo", notices.saveNotice);

module.exports = router;