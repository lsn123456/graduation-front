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
    if (form.length) {
        if (form[0].time === time) {
            res.json({
                code: 0,
                message: '获取成功',
                data: form,
                send: true
            })
        }
    } else {
        res.json({
            code: -1,
            message: '获取失败',
            data: []
        })
    }

});




module.exports = router