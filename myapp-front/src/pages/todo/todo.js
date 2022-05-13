import React, { FC, useState, useEffect, memo, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { fetchget } from '../../redux/zgfetch'
import { useLocation } from 'react-router';
import { fetch } from 'whatwg-fetch';
// import { SmileOutline, SmileFill } from 'antd-mobile-icons'
import './todo.scss'
import {
    Form,
    Input,
    Button,
    Toast,
    Dialog,
    Mask
} from 'antd-mobile'
// import Checkform from '../../components/checkform/checkform';

const ToDo: FC = () => {

    const checkref = useRef()
    const location = useLocation()
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [login, setLogin] = useState(false)
    const [formsubmit, setSubmit] = useState(false)
    const [phone, setPhone] = useState()
    const [formData, setData] = useState({})
    const [formData2, setData2] = useState({})
    const [form] = Form.useForm()
    const [form2] = Form.useForm()




    const getUser = async () => {
        //判断是否登录，未登录则跳转到登录页面
        const user = fetchget("/api/users/getuser").then(async (res) => {

            if (res.login === false) {
                await Dialog.confirm({
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
                    onCancel: async () => {
                        setTimeout(() => {
                            navigate('/home')
                        }, 500)
                    }
                })
            } else {
                setPhone(res.phone)
                console.log(res, "res")
            }

        })

    }

    //获取所有用户的信息，从中随机抽取总数的30%进行抽查,如果当前手机号在抽查数组里，则会弹出抽查表单
    // const getall = async () => {

    //     const user = await fetchget("/api/users/getall")
    //     let swap = (arr, i, j) => {
    //         let t = arr[i];
    //         arr[i] = arr[j];
    //         arr[j] = t;
    //     };
    //     let shuffle = (arr, n) => {
    //         let t = arr.slice(0, arr.length), l = t.length;
    //         for (let i = l - 1; i >= l - n; --i)
    //             swap(t, i, Math.floor(Math.random() * (i + 1)));
    //         return t.slice(l - n, l);
    //     };
    //     let arr = user.userData;
    //     let checklength = Math.floor(arr.length * 0.3)
    //     let checkarr = shuffle(arr, checklength)

    //     const user1 = fetchget("/api/users/getuser").then(async (res) => {

    //         checkarr.push(res.phone)
    //         const now = date().slice(0, 10)
    //         //如果用户在抽查数组内且已经登录，在表单中进行查询是否已提交
    //         if (checkarr.includes(res.phone) && res.login === true) {
    //             const data = await fetch("/api/todo/getall", {
    //                 method: "POST",
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     phone: res.phone
    //                 })
    //             }).then(res => res.json())
    //                 .then(data => {
    //                     console.log(data, "data")
    //                     if (data.code === 0) {
    //                         //如果提交了表单，并且是今天提交的则无需再次提交，如果不是今天提交，则需提交今日表单
    //                         if (data.checkdata) {
    //                             data.checkdata.map(item => {
    //                                 console.log(item.time.slice(0, 10))
    //                                 if (item.time.slice(0, 10) == now) {
    //                                     setVisible(false)
    //                                 } else {
    //                                     setVisible(true)
    //                                 }

    //                             })
    //                         }
    //                     } else if (data.code === -1) {
    //                         setVisible(true)
    //                     }



    //                 })

    //         }

    //     })


    // }



    // //提交抽查表单
    // const onsubmit = () => {
    //     console.log(formData2, "formdata2")

    //     form2.validateFields().then(async (values) => {

    //         if (values) {
    //             setSubmit(true)
    //             const data = await fetch("/api/todo/dailyform", {
    //                 method: "POST",
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     name: formData2.name,
    //                     phone: formData2.phone,
    //                     number: formData2.number,
    //                     temperature: formData2.temperature,
    //                     time: date(),
    //                     submit: formsubmit
    //                 })
    //             }).then(res => res.json())
    //                 .then(data => {
    //                     console.log(data, "data")
    //                     if (data.code === 0) {
    //                         Toast.show({
    //                             icon: 'success',
    //                             content: '提交成功'
    //                         })
    //                         form2.resetFields()
    //                         setVisible(false)


    //                     }
    //                 })
    //         } else if (values.outOfDate === false) {
    //             Toast.show({
    //                 icon: 'fail',
    //                 content: '表单校验失败'
    //             })
    //         }

    //     })

    // }


    useEffect(() => {
        getUser()
        // getall()
        // console.log(checkref.current, location.pathname, "iiiiiii")

    }, [])
    //提交表单的时间
    const date = () => {
        var date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'//年
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'//月
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '//日
        var H = date.getHours() + ':';//时
        var MI = date.getMinutes() + ':'; // 分
        var S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) //秒

        return Y + M + D + H + MI + S

    }

    const submit = async () => {
        //  对表单进行校验，提交后清空表单
        form.validateFields().then(async (values) => {

            if (values) {
                const data = await fetch("/api/todo/dailyform", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        phone: phone,
                        number: formData.number,
                        temperature: formData.temperature,
                        time: date()

                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data, "data")
                        if (data.code === 0) {
                            Toast.show({
                                icon: 'success',
                                content: '提交成功'
                            })
                            form.resetFields()
                        }
                    })
            } else if (values.outOfDate === false) {
                Toast.show({
                    icon: 'fail',
                    content: '表单校验失败'
                })
            }


        })

    }



    return <div className='todo-page' >

        {/* <Mask visible={visible}>

            <div className='diolog' ref={checkref}>
                <div className='title'>今日抽查</div>
                <Form
                    className='checkform'
                    form={form2}
                    footer={
                        <Button block type='submit' className='btn' size='large' onClick={onsubmit}>
                            提交
                        </Button>
                    }
                >
                    <Form.Item name='name' validateTrigger="onBlur" label='姓名' rules={[{ required: true, message: '姓名不能为空' }]}>
                        <Input placeholder='请输入姓名' value={formData2.name} onChange={value => setData2({ ...formData2, name: value })} />
                    </Form.Item>
                    <Form.Item name='number' validateTrigger="onBlur" label='学号/工号' rules={[{ required: true, message: '学号/工号不能为空' }]}>
                        <Input placeholder='请输入学号/工号' value={formData2.number} onChange={value => setData2({ ...formData2, number: value })} />
                    </Form.Item>
                    <Form.Item name='phone' validateTrigger="onBlur" label='联系方式' rules={[{ required: true, message: '联系方式不能为空' }, { pattern: /^1[2-9][0-9]{9}$/, message: "请输入正确的手机号码" }]} >
                        <Input placeholder='请输入电话号码' maxLength={11} value={formData2.phone} onChange={value => setData2({ ...formData2, phone: value })} />
                    </Form.Item>
                    <Form.Item name='temperature' validateTrigger="onBlur" label='今日体温' rules={[{ required: true, message: '体温不能为空' }]}>
                        <Input placeholder='请输入您的体温' value={formData2.temperature} onChange={value => setData2({ ...formData2, temperature: value })} />
                    </Form.Item>
                </Form>
            </div>

        </Mask> */}


        {/* <Checkform visible={visible}></Checkform> */}

        <Form
            form={form}
            footer={
                <Button block type='submit' className='btn' size='large' onClick={submit}>
                    提交
                </Button>
            }
        >
            <Form.Header>为了你我的健康，请认真填写</Form.Header>
            <Form.Item name='name' validateTrigger="onBlur" label='姓名' rules={[{ required: true, message: '姓名不能为空' }]}>
                <Input placeholder='请输入姓名' value={formData.name} onChange={value => setData({ ...formData, name: value })} />
            </Form.Item>
            <Form.Item name='number' validateTrigger="onBlur" label='学号/工号' rules={[{ required: true, message: '学号/工号不能为空' }]}>
                <Input placeholder='请输入学号/工号' value={formData.number} onChange={value => setData({ ...formData, number: value })} />
            </Form.Item>
            {/* <Form.Item name='phone' validateTrigger="onBlur" label='联系方式' rules={[{ required: true, message: '联系方式不能为空' }, { pattern: /^1[2-9][0-9]{9}$/, message: "请输入正确的手机号码" }]} >
                <Input placeholder='请输入电话号码' maxLength={11} value={formData.phone} onChange={value => setData({ ...formData, phone: value })} />
            </Form.Item> */}
            <Form.Item name='phone' label='联系方式' disabled>
                <Input placeholder={phone} />
            </Form.Item>
            <Form.Item name='temperature' validateTrigger="onBlur" label='今日体温' rules={[{ required: true, message: '体温不能为空' }]}>
                <Input placeholder='请输入您的体温' value={formData.temperature} onChange={value => setData({ ...formData, temperature: value })} />
            </Form.Item>

            {/* <Form.Item name='PhysicalCondition' label='是否有感冒咳嗽等不适症状' rules={[{ required: true, message: '请选择是否有不适症状' }]}>
                <Radio.Group
                    value={value}
                    onChange={val => {
                        setValue()
                    }}
                >
                    <Space direction='vertical'>
                        <Radio
                            value='radio1'
                            icon={checked =>
                                checked ? (
                                    <SmileFill style={{ color: 'var(--adm-color-primary)' }} />
                                ) : (
                                    <SmileOutline style={{ color: 'var(--adm-color-weak)' }} />
                                )
                            }
                        >
                            是
                        </Radio>
                        <Radio
                            value='radio2'
                            icon={checked =>
                                checked ? (
                                    <SmileFill style={{ color: 'var(--adm-color-primary)' }} />
                                ) : (
                                    <SmileOutline style={{ color: 'var(--adm-color-weak)' }} />
                                )
                            }
                        >
                            否
                        </Radio>
                    </Space>
                </Radio.Group>
            </Form.Item> */}
        </Form>

    </div>
}
export default memo(ToDo);