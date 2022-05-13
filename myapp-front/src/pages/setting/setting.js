import React, { FC, useState, useEffect } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { Form, Input, Button, Toast } from 'antd-mobile'
import { fetch } from 'whatwg-fetch';
import MD5 from 'crypto-js/md5'
import './setting.scss'
import { useNavigate } from "react-router-dom";


const Setting: FC = () => {
    const [formData, setData] = useState({})
    const [phone, setPhone] = useState()
    let navigate = useNavigate();
    const [form] = Form.useForm()

    const checkPassword = (rule, value) => {
        if (formData.newpassword && formData.newpassword !== formData.confirmpassword) {
            return Promise.reject("两次输入密码不一致")
        }
        return Promise.resolve()

    }
    //获取当前用户信息
    const getUser = async () => {
        const user = fetchget("/api/users/getuser").then((res) => {
            setPhone(res.phone)
        })
    }
    useEffect(() => {
        getUser()
    }, [])


    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            if (values) {
                const data = await fetch("/api/users/pwdchange", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: phone,
                        password: MD5(formData.password).toString(),
                        newpassword: MD5(formData.newpassword).toString(),
                        confirmpassword: MD5(formData.confirmpassword).toString(),
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.code === -1) {
                            Toast.show({
                                icon: 'fail',
                                content: '用户不存在'
                            })

                        } else if (data.code === -2) {
                            Toast.show({
                                icon: 'fail',
                                content: '密码错误'
                            })
                        } else if (data.code === -3) {
                            Toast.show({
                                icon: 'success',
                                content: '修改成功'
                            })
                            form.resetFields()
                        } else if (data.code === -4) {
                            Toast.show({
                                icon: 'fail',
                                content: '两次密码不一致'
                            })
                        }
                    })
            }
        })
    }


    return <div className='page-setting'>
        <Form layout='horizontal' form={form} mode='card' footer={
            <Button block className='settingbtn' onClick={onSubmit} size='large'>
                提交
            </Button>
        }>
            <Form.Header>修改密码</Form.Header>
            <Form.Item label='手机号' disabled>
                <Input placeholder={phone} />
            </Form.Item>
            <Form.Item label='密码' name="password" validateTrigger="onBlur" rules={[{ required: true, message: "密码不能为空" }]}>
                <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, password: value })} />
            </Form.Item>
            <Form.Item label='新密码' name="newpassword " validateTrigger="onBlur" rules={[{ required: true, message: "请输入新密码" }]}>
                <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, newpassword: value })} />
            </Form.Item>
            <Form.Item label='请确认密码' name="confirmpassword" validateTrigger="onBlur" rules={[{ required: true, message: "确认密码不能为空" }, { validator: checkPassword }]}>
                <Input placeholder='请输入' type="password" onChange={value => setData({ ...formData, confirmpassword: value })} />
            </Form.Item>
        </Form>

    </div>
}
export default Setting;