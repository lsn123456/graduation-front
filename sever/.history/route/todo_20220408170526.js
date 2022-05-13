var express = require('express')
var router = express.Router()
const DailyForm = require('../models/dailyform')
// const Todo = require('../models/todo')

router.post("/dailyform", async function (req, res) {
    const { name, number, phone, temperature, time, submit } = req.body;
    const dailyform = new DailyForm({
        name,
        number,
        phone,
        temperature,
        time,
        submit
    })
    dailyform.save().then(function (dailyform, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: '提交失败'
            });
            return
        } else {
            res.status(200).json({
                code: 0,
                message: '提交成功'
            });
        }
    });
});

router.get("/getform", function (req, res) {
    DailyForm.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                formData: []
            });
        } else {
            res.status(200).json({
                code: 0,
                formData: data
            });
        }
    });
});


router.post("/getall", async function (req, res) {
    const { phone, time } = req.body;

    const form = await DailyForm.find(phone)

    function now() {
        var date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'//年
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'//月
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '//日
        return Y + M + D;

    }
    const nowtime = now()
    console.log(form, nowtime, "ooo")

    if (form.length) {
        const date = form[0].time.slice(0, 10)
        console.log(date)
        if (date == nowtime) {
            res.json({
                code: 0,
                message: '获取成功',
                data: form,
                send: true
            })
        } else if (date != nowtime) {

            res.json({
                code: -1,
                message: '获取失败',
                data: [],
                send: false
            })

        }
    }



})




module.exports = router