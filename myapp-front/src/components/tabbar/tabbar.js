import React, { useState } from 'react';
import { TabBar, Badge } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    FileOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import './tabbar.scss'



export default function Tab() {
    // const location = useLocation()
    const [activeKey, setActiveKey] = useState('')
    const navigate = useNavigate();
    // setActiveKey(location.pathname)

    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,

        },

        {
            key: 'todo',
            title: '待办',
            icon: <UnorderedListOutline />,

        },
        {
            key: 'news',
            title: '校园',
            icon: <MessageOutline />

        },
        {
            key: 'information',
            title: '资讯',
            icon: <FileOutline />

        },
        {
            key: 'personalCenter',
            title: '个人',
            icon: <UserOutline />,
        },
    ]

    const tabChange = (select: string) => {
        setActiveKey(select)
        navigate(`/${select}`)
    }

    return <TabBar className='mytab' activeKey={activeKey} onChange={(select) => tabChange(select)}>
        {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
    </TabBar>


}




