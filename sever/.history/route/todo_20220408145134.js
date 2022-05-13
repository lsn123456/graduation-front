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
    const form = await DailyForm.find({ phone })
    console.log("form", form)
    if (form.length) {
        console.log(form[0], 'xxxxxxx')
        if (user[0].password === password) {
            req.session.user = user[0];
            res.status(200).json({
                code: 0,
                message: '登录成功'
            })
        } else {
            res.status(200).json({
                code: -2,
                msg: '密码错误'
            })
        }
    }
    else {
        res.status(200).json({
            code: -1,
            msg: '账号不存在'
        })
    }
})




module.exports = router