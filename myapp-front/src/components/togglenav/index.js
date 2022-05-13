import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

// import { withRouter } from "react-router-dom";

import Nav from '../nav/nav';
import Nav1 from '../nav1/nav1';
import Nav2 from '../nav2/nav2';

function ToggleNav(props) {
    const location = useLocation()
    let [navType, setNavType] = useState("nav")

    //相当于componentDidMount
    useEffect(() => {
        //使用nav导航组件的路由
        let rootRouteArr = ['/login', '/register']
        let detailRootArr = ['/home', '/todo', '/news', '/personalCenter', '/notice', '/information', '/information/riskarea', '/information/nearby', '/home/abroad', '/home/abroad/africa', '/home/abroad/europe', '/home/abroad/northamerica', '/home/abroad/southamerica', '/home/abroad/oceania']
        //获取到当前路由路径
        const path = location.pathname;
        console.log(location.pathname, "pathname")
        //使用nav
        if (rootRouteArr.includes(path)) {
            setNavType("nav")
        } else if (detailRootArr.includes(path)) {

            setNavType("nav1")
        } else {
            setNavType("nav2")
        }
    }, [location.pathname])


    const getNav = () => {
        if (navType === 'nav') {
            return <Nav></Nav>
        }
        else if (navType === 'nav1') {
            return <Nav1></Nav1>
        } else {
            return <Nav2></Nav2>
        }
    }

    return (<div>{getNav()}</div>)
}

export default ToggleNav