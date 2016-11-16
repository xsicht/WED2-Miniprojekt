var express = require('express');
var router = express.Router();
var notices = require('../control/controller');

router.get("/", notices.showIndex);
router.get("/:sorting/", notices.showSorted);
router.get("/todo", notices.newTodo);
router.post("/todo", notices.saveNotice);
router.get("/todo/:id/", notices.showTodo);
router.post("/todo/:id/", notices.updateNotice);

module.exports = router;