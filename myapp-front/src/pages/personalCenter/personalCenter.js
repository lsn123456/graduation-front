import React, { FC, useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { useNavigate } from "react-router-dom";
import { List, Dialog, Toast } from 'antd-mobile'

import {
    UserSetOutline,
    UnlockOutline,
    SetOutline,
} from 'antd-mobile-icons'
const PersonalCenter: FC = () => {


    const navigate = useNavigate();
    const [phone, setPhone] = useState()


    const getUser = async () => {
        //判断是否登录，未登录则跳转到登录页面
        const user = fetchget("/api/users/getuser").then((res) => {
            setPhone(res.phone)

        })


    }


    useEffect(() => {
        getUser()
    }, [])

    const logOut = async () => {

        const users = fetchget("/api/users/getuser").then((res) => {
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
            } else if (res.login === true) {
                Dialog.confirm({
                    content: '确认退出',
                    onConfirm: async () => {
                        const user = fetchget("/api/users/exituser").then((res) => {
                            if (res.code === 0) {
                                Toast.show({
                                    icon: 'success',
                                    content: '退出登录',
                                    duration: 1000
                                })
                                setTimeout(() => {
                                    navigate('/login')
                                }, 1000)

                            }

                        })
                    },
                })


            }

        })

    }

    const pwdchange = () => {
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
            } else if (res.login === true) {
                navigate('/setting')
            }

        })

    }
    const phonechange = () => {
        console.log("xiugaishouji")
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
            } else if (res.login === true) {
                navigate('/setphone')
            }

        })

    }

    return <div className='page-personalCenter'>


        <List header='个人中心'>


            <List.Item prefix={<SetOutline />} onClick={pwdchange}>
                修改密码
            </List.Item>

            <List.Item prefix={<UnlockOutline />} onClick={logOut}>
                退出登录
            </List.Item>

            <List.Item prefix={<UserSetOutline />} extra={phone} onClick={phonechange}>
                手机号
            </List.Item>
        </List>
    </div>
}
export default PersonalCenter;