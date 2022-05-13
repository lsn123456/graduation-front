const express = require("express");
const app = express();//创建一台叫app的服务器

//引入相关包
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config");
const bodyParser = require("body-parser");
const expressSession = require("express-session");


const user = require("./route/user");
const news = require("./route/news");
const notice = require("./route/notice")
const todo = require("./route/todo")
const path = require("path");


app.use(
	expressSession({
		secret: "password",
		resave: false,
		saveUninitialized: false
	})
);
//mongoose连接
mongoose.connect(dbConfig.dbs, {
	useNewUrlParser: true
});

app.all("/api/*", (req, res, next) => {
	//设置允许跨域响应报文头
	//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "*");
	res.setHeader("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", user);
app.use("/api/todo", todo);
app.use("/api/news", news);
app.use("/api/notice", notice);




app.post("/api/login", (req, res) => {
	const body = req.body;
	if (body.password === "123456") {
		res.json({
			code: 200,
			message: '登录成功',
			data: {
				token: '@word(50, 100)', // @word()是mockjs的语法
				refresh_token: '@word(50, 100)', // refresh_token是用来重新生成token的
			},
		})
	}
	else {
		res.json({
			code: 400,
			message: '密码错误，请输入123456',
		})
	}
})

app.get("/api/userinfo", (req, res) => {
	res.json({
		code: 200,
		message: '获取用户信息成功',
		data: {
			id: 1,
			name: 'zhangsan',
			'role|1': ['admin', 'visitor'], // 随机返回一个角色admin或visitor
			avatar: "@image('48x48', '#fb0a2a')",
		},
	})

})

app.get("/api/menus", (req, res) => {
	const query = req.query;
	const params = req.params;
	console.log(query, params)
	const childs = [
		{
			name: 'testList',
			title: '列表',
		},
		{
			name: 'testAdd',
			title: '添加',
		},
		{
			name: 'testEdit',
			title: '编辑',
		},
		{
			name: 'testAuth',
			title: '权限测试',
		},
		{
			name: 'test-cache',
			title: '该页面可缓存',
		},
		{
			name: 'test-no-cache',
			title: '该页面不可缓存',
		},
		{
			name: 'nest',
			title: '二级菜单',
			children: [
				{
					name: 'nestPage1',
					title: 'page1',
				},
				{
					name: 'nestPage2',
					title: 'page2',
				},
			],
		},
		{
			name: 'test-error-log',
			title: '测试错误日志',
		},
	]

	if (query.role === 'admin')
		childs.push({
			name: 'testNoAuth',
			title: '权限页面',
		})

	res.json({
		code: 200,
		message: '获取菜单成功',
		data: [
			{
				name: 'test',
				title: '测试页面',
				children: childs,
			},
		],
	}
	)
})






const port = 9999;
// Listen the server
app.listen(`${port}`, () => {
	console.log(`${port}端口已启用`);
});
