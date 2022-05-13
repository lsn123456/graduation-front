/* eslint-disable no-undef */
import React, { useState, FC } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom'
import { fetchget } from '../../redux/zgfetch'
import { fetch } from 'whatwg-fetch'
import MD5 from 'crypto-js/md5'
import './register.scss'

const Register: FC = (props) => {
    const [formData, setData] = useState({})
    let navigate = useNavigate();
    const [form] = Form.useForm()
    const onSubmit = async () => {

        form.validateFields().then(async (values) => {
            if (values) {
                // const data = await fetch("/api/users/signup", {
                await fetch("/api/users/signup", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // email: formData.email,
                        phone: formData.phone,
                        password: MD5(formData.password).toString(),
                        newpassword: MD5(formData.newpassword).toString()
                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data, "data")
                        if (data.code === 0) {
                            console.log(data, "data")
                            Toast.show({
                                icon: 'success',
                                content: '注册成功'
                            })
                            setData(() => { })
                            setTimeout(() => {
                                Toast.clear()
                            }, 1000)
                            navigate('/login');

                        } else if (data.code === -1) {
                            Toast.show({
                                icon: 'fail',
                                content: '用户已存在'
                            })

                        }
                    })
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '验证失败'
                })
            }


        })

    }

    const checkPassword = (rule, value) => {
        if (formData.password && formData.password !== formData.newpassword) {
            return Promise.reject("两次输入密码不一致")
        }
        return Promise.resolve()
    }
    const btnclick = () => {
        // let aa = 8888
        let data = MD5(6666).toString()
        console.log(data, "ooo")
    }

    return (


        <div className="page-register" >
            {/* <Button onClick={btnclick}>444</Button> */}
            <Form layout='horizontal' form={form} mode='card' footer={
                <Button block className='rigisterbtn' onClick={onSubmit} size='large'>
                    提交
                </Button>
            }>
                <Form.Header>注册</Form.Header>
                <Form.Item label='手机号' name="phone" validateTrigger="onBlur" rules={[{ required: true, message: "手机号不能为空" }, { pattern: /^1[2-9][0-9]{9}$/, message: "请输入正确的手机号码" }]} >
                    <Input placeholder='请输入' maxLength={11} onChange={value => setData({ ...formData, phone: value })} />
                </Form.Item>
                {/* <Form.Item label='邮箱' name="email" validateTrigger="onBlur" rules={[{ required: true, message: "邮箱不能为空" }, { pattern: /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,6})$/, message: "请输入正确的邮箱地址" }]}>
                    <Input placeholder='请输入' onChange={value => setData({ ...formData, email: value })} />
                </Form.Item> */}
                <Form.Item label='密码' name="password " validateTrigger="onBlur" rules={[{ required: true, message: "密码不能为空" }]}>
                    <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, password: value })} />
                </Form.Item>
                <Form.Item label='请确认密码' name="newpassword" validateTrigger="onBlur" rules={[{ required: true, message: "确认密码不能为空" }, { validator: checkPassword }]}>
                    <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, newpassword: value })} />
                </Form.Item>
            </Form>

            <Link to="/login">已有账号，去登录 </Link>


        </div >

    )


}


export default Register



