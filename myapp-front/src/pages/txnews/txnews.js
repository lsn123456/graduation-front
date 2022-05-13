import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd-mobile'
import { fetchget } from '../../redux/zgfetch';
import './txnews.scss'
function Txnews() {

    const [news, setNews] = useState([])

    const getNews = async () => {
        const data3 = await fetchget('/ncov/index?key=ad4f4536ec008f2a3f454f046ac023e4')
        const newslist = data3.newslist[0].news
        setNews(newslist)
        // console.log(data3, "ooooo")
    }


    useEffect(() => {
        getNews()

    }, [])



    return <div className='page-txnews'>
        {
            news && news.map((item, index) => {
                return (
                    <Collapse defaultActiveKey={item.id} key={index}>
                        <Collapse.Panel key='item.id' title={item.title} className="panel-item">
                            {item.summary}
                        </Collapse.Panel>
                    </Collapse>
                )
            })
        }
    </div>
}
export default Txnews;