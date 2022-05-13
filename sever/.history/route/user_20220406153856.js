var express = require('express')
var router = express.Router()
const User = require('../models/user')

//注册接口
router.post("/signup", async function (req, res) {
    const { phone, password, newpassword, email } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ phone })
    if (user.length) {
        res.status(200).json({
            code: -1,
            msg: '手机号已被注册'
        })
        return;
    }

    // 如果注册请求没有问题，则将用户信息写入数据库
    const nuser = new User({
        phone,
        password,
        newpassword,
        email
    })
    nuser.save().then(function (user, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: '注册失败'
            })
            return
        }
        res.status(200).json({
            code: 0,
            message: '恭喜您注册成功'
        })
    })
})

router.post("/userlogin", async function (req, res) {
    const { phone, password } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ phone })
    if (user.length) {
        console.log(user[0], 'xxxxxxx')
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

router.get("/getuser", async function (req, res) {
    if (req.session.user) {
        const { phone, email } = req.session.user
        res.status(200).json({
            phone,
            email,
            login: true
        })
    } else {
        res.status(200).json({
            name: '',
            email: '',
            login: false
        })
    }

})
//退出登录
router.get("/exituser", async function (req, res) {
    req.session.user = [];
    req.session.destroy()
    res.json({
        code: 0
    })
})

router.post("/pwdchange", async function (req, res) {
    const { phone, password, newpassword, confirmpassword } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ phone })

    if (user[0].password === password) {
        req.session.user = user[0];
        if (newpassword === confirmpassword) {
            User.updateOne({ phone: phone }, { $set: { password: newpassword } }).then(() => {
                res.status(200).json({
                    code: -3,
                    message: "修改成功"
                });
                return;
            })
        } else {
            res.status(200).json({
                code: -4,
                message: "两次密码不一致"
            });
            return;
        }
    } else {
        res.status(200).json({
            code: -2,
            msg: '密码错误'
        })
        return;
    }

})


router.post("/phonechange", async function (req, res) {

    console.log(req.session)
    const { phone, newphone } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ phone })

    if (user[0].phone === phone) {
        req.session.user = user[0];
        User.updateOne({ phone: phone }, { $set: { phone: newphone } }).then(() => {
            res.status(200).json({
                code: -1,
                message: "修改成功"
            });
            return;
        })
    } else {
        res.status(200).json({
            code: -2,
            msg: '修改失败'
        })
        return;
    }

})


module.exports = router