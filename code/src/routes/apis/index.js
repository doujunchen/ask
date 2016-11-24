/**
 * Created by plter on 2016/11/22.
 */
const Status = require("../../source/Status");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.all('/getuser', function (req, res, next) {
    if (req.session.currentUser) {
        res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, req.session.currentUser));
    } else {
        res.json(Status.makeResult(Status.STATE_NO_USER_LOGGED, Status.STATE_NO_USER_LOGGED_MESSAGE));
    }
});

router.all('/config', function (req, res) {
    req.models.Config.find({}, function (err, result) {
        if (!err) {
            let obj = {};
            for (let item of result) {
                obj[item.name] = item.value;
            }

            res.json(Status.makeResult(Status.STATE_OK, Status.STATE_OK_MESSAGE, obj));
        } else {
            res.json(Status.makeResult(err.errno, err.code));
        }
    });
});

module.exports = router;