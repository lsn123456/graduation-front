import React, { useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { parseTime } from '../../utils/parsetime';
import { Collapse } from 'antd-mobile'
import '../asia/asia.scss'

function Oceania(props) {


    const [asiadata, setAsia] = useState([])
    const [updatetime, setUptime] = useState()
    const getabroad = async () => {
        const data = await fetchget('/ncovabroad/index?key=ad4f4536ec008f2a3f454f046ac023e4')
        const asialist = []
        data.newslist.map(item => {
            if (item.continents === '大洋洲') {
                asialist.push(item)
            }
        })
        setAsia(asialist)
        setUptime(parseTime(asialist[0].modifyTime))
        console.log(parseTime(asialist[0].modifyTime), "abroad")
    }

    useEffect(() => {
        getabroad()
    }, [])

    return <div className='page-asia'>
        <div className='time'>数据更新时间:{updatetime}</div>
        {
            asiadata && asiadata.map((item, index) => {
                return (
                    <Collapse defaultActiveKey={index} key={index}>
                        <Collapse.Panel key={index} title={item.provinceName}>
                            <div className='content'>
                                <div className='item'>
                                    <div className='title'>累计排名</div>
                                    <div className='count'>{item.confirmedCountRank}</div>
                                </div>
                                <div className='item'>
                                    <div className='title'>累计确诊</div>
                                    <div className='count'> {item.confirmedCount}</div>
                                </div>
                                <div className='item'>
                                    <div className='title'>现存确诊</div>
                                    <div className='count'>{item.currentConfirmedCount}</div>
                                </div>
                                <div className='item'>
                                    <div className='title'>死亡排名</div>
                                    <div className='count'>{item.deadCountRank}</div>
                                </div>
                                <div className='item'>
                                    <div className='title'>治愈人数</div>
                                    <div className='count'>{item.curedCount}</div>
                                </div>
                                <div className='item'>
                                    <div className='title'>死亡人数</div>
                                    <div className='count'>{item.deadCount}</div>
                                </div>




                            </div>
                        </Collapse.Panel>
                    </Collapse>
                )
            })
        }
    </div>
}
export default Oceania;