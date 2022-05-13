var express = require('express')
var router = express.Router()
const Notice = require('../models/notice')
// const News = require('../models/news')

router.get("/notice", function (req, res) {
    Notice.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                noticeData: []
            });
        } else {
            res.status(200).json({
                code: 0,
                noticeData: data
            });
        }
    });
});

router.post("/noticeadd", async function (req, res) {
    const { title, content } = req.body;
    const notice = await Notice.find({ title })
    var nnotice = new Notice({ title, content });
    nnotice.save().then(function (nnotice, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: '添加失败'
            })
            return
        }
        res.status(200).json({
            code: 0,
            message: '恭喜您添加成功'
        })
    })
})



module.exports = router