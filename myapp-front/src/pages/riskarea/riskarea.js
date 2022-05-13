
import React, { useEffect, useState } from 'react'
import { List } from 'antd-mobile'
import { fetchget } from '../../redux/zgfetch';
import './riskarea.scss'
function Riskarea() {

    const [midarea, setMidArea] = useState([])
    const [higharea, setHighArea] = useState([])

    const getNews = async () => {
        const data3 = await fetchget('/ncov/index?key=ad4f4536ec008f2a3f454f046ac023e4')
        const riskarea = data3.newslist[0].riskarea
        const midarea = riskarea.mid
        setMidArea(midarea)
        const high = riskarea.high
        setHighArea(high)
    }


    useEffect(() => {
        getNews()

    }, [])

    return <div className='page-riskarea'>
        <List header='高风险地区' className='detail'>
            {
                higharea && higharea.map((item, index) => {
                    return (
                        <List.Item key={index} >
                            {item}
                        </List.Item>
                    )
                })
            }
        </List>
        <List header='中风险地区' className='detail'>
            {
                midarea && midarea.map((item, index) => {
                    return (
                        <List.Item key={index} >
                            {item}
                        </List.Item>
                    )
                })
            }
        </List>

    </div>
}
export default Riskarea;