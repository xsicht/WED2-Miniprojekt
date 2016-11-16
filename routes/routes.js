var express = require('express');
var router = express.Router();
var notices = require('../control/controller');

router.get("/", notices.showIndex);
router.get("/notices", notices.showAllNotices);
router.get("/notices/:id/", notices.showNotice);
router.post("/notices", notices.createNotice);
router.post("/notices/:id/", notices.updateNotice);
router.delete("/notices/:id/", notices.deleteNotice);

module.exports = router;