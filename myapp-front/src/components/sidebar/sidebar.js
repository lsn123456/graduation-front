import React, { useState } from 'react';
import { SideBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    FileOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'




export default function Sidebar() {
    // const location = useLocation()
    const [activeKey, setActiveKey] = useState('')
    const navigate = useNavigate();
    // setActiveKey(location.pathname)

    const tabs = [
        {
            key: 'asia',
            title: '亚洲',
        },

        {
            key: 'europe',
            title: '欧洲',
        },
        {
            key: 'africa',
            title: '非洲',
        },
        {
            key: 'northamerica',
            title: '北美洲',
        },
        {
            key: 'southamerica',
            title: '南美洲',
        },
        {
            key: 'oceania',
            title: '大洋洲',
        },
    ]

    const tabChange = (select: string) => {
        setActiveKey(select)
        navigate(`/${select}`)
    }

    return <div>

        <SideBar activeKey={activeKey} onChange={setActiveKey}>
            {tabs.map(item => (
                <SideBar.Item key={item.key} title={item.title} />
            ))}
        </SideBar>
        <div className='content'>
            <div
            >
                页面 1
            </div>
            <div
            >
                页面 2
            </div>
            <div

            >
                页面 3
            </div>
        </div>
    </div>

    // <TabBar className='mytab' activeKey={activeKey} onChange={(select) => tabChange(select)}>
    //     {tabs.map(item => (
    //         <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
    //     ))}
    // </TabBar>


}




