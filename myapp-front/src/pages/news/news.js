import React, { useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { List } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './news.scss'

function Message(props) {
    const [newsdata, setData] = useState()
    const getNews = async () => {
        const newsData = await fetchget("/api/news/news")
        const data = newsData.newsData.reverse();
        setData(data);
    }

    useEffect(() => {
        getNews()

    }, [])

    return <div className='page-news'>
        <div className='head'>
            <Link to="/news" className='news'>新闻中心</Link>
            <Link to="/notice" className='notice'>校园公告</Link>
        </div>

        <List className='detail'>
            {
                newsdata && newsdata.map((item, index) => {
                    return (
                        <Link key={index} to={{ pathname: "/newsdetail/" + item._id }}>
                            <List.Item  >
                                {item.title}
                            </List.Item>
                        </Link>
                    )
                })
            }
        </List>




    </div>
}
export default Message;