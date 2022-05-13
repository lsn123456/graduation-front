import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";

function Nav2(props) {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1)
    }

    return (
        <div className='page-nav'>
            <NavBar backArrow={<LeftOutline />} back='返回' onBack={back} >智慧校园</NavBar>
        </div>
    )
}

export default Nav2;