// login.js
import React, { useState, useContext } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom'
import { fetchget } from '../../redux/zgfetch'
import MD5 from 'crypto-js/md5'
import './login.scss'
import context from '../../redux/context'


function Login(props) {

    // let [Login, dispatch] = useContext(context)

    const [formData, setData] = useState({})
    const [form] = Form.useForm()
    let navigate = useNavigate();

    const onSubmit = async () => {
        console.log(Login, "kkkkk")

        const data = await fetch("/api/users/userlogin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: formData.phone,
                password: MD5(formData.password).toString()
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data, "data")

                if (data.code === 0) {
                    Toast.show({
                        icon: 'success',
                        content: '登录成功'
                    })
                    setData(() => { })
                    setTimeout(() => {
                        Toast.clear()
                    }, 1000)
                    navigate('/home');
                } else if (data.code === -1) {
                    Toast.show({
                        icon: 'fail',
                        content: '账号不存在'
                    })
                } else if (data.code === -2) {
                    Toast.show({
                        icon: 'fail',
                        content: '密码错误'
                    })
                }


            })




    }


    return <div className="page-login">

        <Form layout='horizontal' mode='card' footer={
            <Button className='loginbtn' block onClick={onSubmit} size='large'>
                登录
            </Button>
        }>
            <Form.Header>登录</Form.Header>
            <Form.Item label='手机号' name="phone" validateTrigger="onBlur" rules={[{ pattern: /^1[2-9][0-9]{9}$/, message: "请输入正确的手机号码" }]}>
                <Input placeholder='请输入' maxLength={11} onChange={value => setData({ ...formData, phone: value })} />
            </Form.Item>
            <Form.Item label='密码' rules={[{ required: true }]}>
                <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, password: value })} />
            </Form.Item>
        </Form>
        <Link to="/register"> 来到注册页面</Link>




    </div>




}

export default Login