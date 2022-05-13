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


// router.post("/getall", async function (req, res) {
//     const { phone, time } = req.body;
//     const form = await DailyForm.find({ phone })
//     console.log(form)

//     if (form.length) {
//         console.log(form[0].time.slice(0, 10), "form", req.time, "time", phone, "phone")
//         // if (form[0].time.slice(0, 10) === time) {
//         //     res.json({
//         //         code: 0,
//         //         message: '获取成功',
//         //         data: form,
//         //         send: true
//         //     })
//         // }
//         // console.log(form[0].slice(0, 10))
//     } else {
//         res.json({
//             code: -1,
//             message: '获取失败',
//             data: []
//         })
//     }

// });
router.post("/getall", async function (req, res) {
    const { phone, time } = req.body;
    //根据用户名从数据查询有没有指定用户
    function date() {
        const date = new Date()
        var Y = date.getFullYear() + '-'//年
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'//月
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '//日
        return Y + M + D;
    }
    const now = date()

    const form = await DailyForm.find(phone)
    console.log("form", form, now)
    if (form.length) {
        if (form[0].time.slice(0, 10) === now) {
            console.log("llll")
        }
    }

    // if (form.length) {
    //     console.log(form[0], 'xxxxxxx')
    //     if (form[0].time.slice(0, 10)) {
    //         res.json({
    //             code: 0,
    //             message: '获取成功',
    //             data: form,
    //             send: true
    //         })
    //         console.log(time, "kkk")
    //     }

})




module.exports = router