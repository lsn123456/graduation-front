import React, { useState, memo } from 'react'
import {
    Form,
    Input,
    Button,
    Toast,
    Mask
} from 'antd-mobile'


function Checkform(props) {

    // const [visible, setVisible] = useState(false)
    const [formData2, setData2] = useState({})
    const [form2] = Form.useForm()
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

    //提交抽查表单
    const onsubmit = () => {
        console.log(formData2, "formdata2")

        form2.validateFields().then(async (values) => {

            if (values) {

                const data = await fetch("/api/todo/dailyform", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData2.name,
                        phone: formData2.phone,
                        number: formData2.number,
                        temperature: formData2.temperature,
                        time: date(),

                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data, "data")
                        if (data.code === 0) {
                            Toast.show({
                                icon: 'success',
                                content: '提交成功'
                            })
                            form2.resetFields()
                            // setVisible(false)
                            props.reload()


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


    return (
        <div className='page-checkform'>
            <Mask visible={props.visible} >

                <div className='diolog'>
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

            </Mask>
        </div>
    )
}

export default memo(Checkform);