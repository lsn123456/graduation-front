var express = require('express')
var router = express.Router()
const News = require('../models/news')

router.get("/news", function (req, res) {
    News.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                newsData: []
            });
        } else {
            res.status(200).json({
                code: 0,
                newsData: data
            });
        }
    });
});

router.post("/newsadd", async function (req, res) {
    const { title, content } = req.body;
    // const news = await News.find({ title })
    var nnews = new News({ title, content });
    nnews.save().then(function (news, err) {
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

// router.get("/news", function (req, res) {
//     News.find().then(function (data, err) {
//         let curPage = parseInt(req.query.page) || 1;
//         let pageSize = parseInt(req.query.pageSize) || 10;
//         let size = Math.round(student.length / pageSize);
//         if (curPage >= size) {
//             curPage = size;
//         } else if (curPage <= 1) {
//             curPage = 1;
//         }
//         News.find().then(function (data, err) {
//             if (err) {
//                 res.status(200).json({
//                     code: -1,
//                     newsData: []
//                 });
//             } else {
//                 res.status(200).json({
//                     code: 0,
//                     newsData: data
//                 });
//             }
//         }


//     });
// });


module.exports = router