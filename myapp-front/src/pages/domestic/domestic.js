import React, { useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { List } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './domestic.scss'

const Item = List.Item;
function Domestic(props) {
    const [daily, setDaily] = useState()//全国每日新增
    let [citylist, setCitylist] = useState()
    let [uptime, setUptime] = useState()



    const getCity = async () => {

        const data = await fetchget(`/news/wap/fymap2020_data.d.json`)
        const datacontent = data.data
        const daily = datacontent.add_daily
        setDaily(daily)
        setCitylist(datacontent.list)
        setUptime(datacontent.times)
        // console.log(datacontent, "kkk")

    }


    useEffect(() => {
        getCity()
    }, [])

    return <div className='page-domestic'>
        <div className='time'>数据更新时间：{uptime}</div>
        <div className='contry'>
            <div className='total'>全国疫情</div>
            <div className='grid'>
                <div className='grid-item'>
                    <div className='title confirm'>新增</div>
                    <div className='count confirm'>{daily && daily.addcon_new}</div>
                </div>
                <div className='grid-item '>
                    <div className='title heal'>治愈</div>
                    <div className='count heal'>{daily && daily.addcure_new}</div>
                </div>
                <div className='grid-item '>
                    <div className='title dead'>死亡</div>
                    <div className='count dead'>{daily && daily.adddeath_new}</div>
                </div>
                <div className='grid-item '>
                    <div className='title newadd'>确诊</div>
                    <div className='count newadd'>{daily && daily.addecon_new}</div>
                </div>
            </div>
        </div>
        <div className='addr'>
            <div className='item'>地区</div>
            <div className='item'>无症状</div>
            <div className='item'>治愈</div>
            <div className='item'>死亡</div>
        </div>

        <List className='detail'>
            {
                citylist && citylist.map((item, index) => {
                    return (
                        <Link key={index} to={{ pathname: "/citydetail/" + item.name, query: { city: item.name } }} >
                            <Item city={item.city} extra={<div className='content'><div>{item.asymptomNum === '' ? '0' : item.asymptomNum}</div><div>{item.cureNum}</div><div>{item.deathNum}</div></div>}>
                                {item.name}

                            </Item>
                        </Link>
                    )
                })
            }
        </List>

    </div>
}
export default Domestic;