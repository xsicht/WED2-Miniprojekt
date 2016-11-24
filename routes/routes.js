var express = require('express');
var router = express.Router();
var notices = require('../control/controller');

router.get("/", notices.showIndex);
router.get("/sort/:sorting", notices.showSorted);
router.post("/todo", notices.saveNotice);
router.get("/todo/:id/", notices.showTodo);
router.post("/todo/:id/", notices.updateNotice);
router.get("/delete/:id", notices.deleteNotice);
router.get("/switchStyle/", notices.switchStyle);

module.exports = router;