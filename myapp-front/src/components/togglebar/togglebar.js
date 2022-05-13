import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Tab from '../tabbar/tabbar';
import Tab2 from '../tabbar2/tabbar2';

function ToggleBar(props) {
    const location = useLocation()
    let [tabType, settabType] = useState("tab")

    //相当于componentDidMount
    useEffect(() => {
        //使用tab导航组件的路由
        let rootRouteArr = ['/', '/home', '/todo', '/news', '/notice', '/personalCenter', '/information', '/information/riskarea', '/information/nearby']

        //获取到当前路由路径
        const path = location.pathname;

        //使用tab
        if (rootRouteArr.includes(path)) {
            settabType("tab")
        }
        //使用tab2
        else {
            settabType("tab2")
        }
    }, [location.pathname])


    const getTab = () => {
        if (tabType === 'tab') {
            return <Tab></Tab>
        }
        else if (tabType === 'tab2') {
            return <Tab2></Tab2>
        }
    }

    return (<div>{getTab()}</div>)
}

export default ToggleBar