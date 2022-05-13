import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { List } from 'antd-mobile'
import { fetchget } from '../../redux/zgfetch';
import './notice.scss'
function Notice(props) {
    const [noticedata, setData] = useState()
    const getNotice = async () => {
        const noticedata = await fetchget("/api/notice/notice")
        const data = noticedata.noticeData.reverse();
        setData(data);

    }

    useEffect(() => {
        getNotice()
    }, [])

    return (

        <div className='page-notice' >
            <div className='head'> <Link to="/news" className='news'>新闻中心</Link>
                <Link to="/notice" className='notice'>校园公告</Link></div>
            <List className='detail'>

                {
                    noticedata && noticedata.map((item, index) => {
                        return (

                            <Link key={index} to={{ pathname: "/noticedetail/" + item._id }}>
                                <List.Item  >
                                    {item.title}

                                </List.Item>
                            </Link>

                        )
                    })
                }

            </List>
        </div >
    )
}
export default Notice;


