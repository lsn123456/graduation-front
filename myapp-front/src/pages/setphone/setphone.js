import React, { useState, useEffect } from 'react'
import { fetchget } from '../../redux/zgfetch'
import { useNavigate } from "react-router-dom";
import { AutoCenter, Form, Button, Input, Dialog, Toast } from 'antd-mobile'
import { PhoneFill } from 'antd-mobile-icons'
import './setphone.scss'
function SetPhone(props) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState()
    const [formData, setData] = useState({})
    const [form] = Form.useForm()

    const getUser = async () => {

        //判断是否登录，未登录则跳转到登录页面
        const user = fetchget("/api/users/getuser").then((res) => {
            if (res.login === false) {
                Dialog.confirm({
                    content: '您还未登录，是否前往登录',
                    onConfirm: async () => {
                        Toast.show({
                            icon: 'success',
                            content: '前往登录',
                            duration: 1000

                        })
                        setTimeout(() => {
                            navigate('/login')
                        }, 1000)
                    },
                })
            } else {
                setPhone(res.phone)
            }

        })

    }


    useEffect(() => {
        getUser()
    }, [])


    const onSubmit = async () => {
        form.validateFields().then(async (values) => {
            if (values) {

                await fetch("/api/users/phonechange", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: phone,
                        newphone: formData.newphone
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.code === -1) {
                            Toast.show({
                                icon: 'success',
                                content: '修改成功,重新登录'
                            })

                            setTimeout(() => {
                                navigate('/login');
                            }, 1000)



                        } else if (data.code === -2) {
                            Toast.show({
                                icon: 'fail',
                                content: '修改失败'
                            })
                        }
                    })
            }
        })
    }

    return <div className='page-setphone'>
        <AutoCenter ><PhoneFill className='phonefill' /></AutoCenter>
        <AutoCenter className='nowphone'> 当前手机号为：{phone}</AutoCenter>
        <Form
            name='form'
            form={form}
            layout='horizontal'
            mode='card'
            footer={
                <Button block className='phonebtn' size='large' onClick={onSubmit}>
                    提交
                </Button>
            }
        >
            <Form.Item name='name' validateTrigger="onBlur" label='新的手机号' rules={[{ required: true, message: "手机号不能为空" }, { pattern: /^1[2-9][0-9]{9}$/, message: "请输入正确的手机号码" }]} >
                <Input placeholder='请输入新的手机号' maxLength={11} onChange={value => setData({ ...formData, newphone: value })} />
            </Form.Item>
        </Form>

    </div>
}
export default SetPhone;