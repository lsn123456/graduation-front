import React, { useState, setState, useEffect } from 'react';
import { fetchget } from '../../redux/zgfetch';
import { List } from 'antd-mobile'
import { useParams } from 'react-router-dom';
import './citydetail.scss'


function CityDetail(props) {
    const [citycontent, setCity] = useState()
    const [children, setChildren] = useState()
    const params = useParams();
    const getCityDetail = async () => {
        const data = await fetchget(`/news/wap/fymap2020_data.d.json`)
        const datacontent = data.data
        // const detaildata = await fetchget("/api/city/detail")
        const city = []
        // eslint-disable-next-line array-callback-return
        datacontent.list.map(item => {
            if (item.name === params.name) {
                city.push(item);
            }
        })
        const citycontent = city[0];
        setCity(citycontent)
        const children = city[0].city;
        setChildren(children)


        console.log(citycontent)


    }
    useEffect(() => {
        getCityDetail()
    }, [])



    return (
        <div className='page-citydetail'>
            <div className='local'>当前省/市：<div>{citycontent && citycontent.name}</div></div>
            <div className='head'>
                <div className='item'>
                    <div className='title'>无症状</div>
                    <div className='count'>{citycontent && citycontent.asymptomNum}</div>
                </div>
                <div className='item'>
                    <div className='title'>治愈</div>
                    <div className='count'>{citycontent && citycontent.cureNum}</div>
                </div>
                <div className='item'>
                    <div className='title'>死亡</div>
                    <div className='count'>{citycontent && citycontent.deathNum}</div>
                </div>
                <div className='item'>
                    <div className='title'>确诊</div>
                    <div className='count'>{citycontent && citycontent.econNum}</div>
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
                    children && children.map((item, index) => {
                        return (

                            <List.Item key={index} extra={<div className='content'><div>{item.asymptomNum === '' ? '0' : item.asymptomNum}</div><div>{item.cureNum}</div><div>{item.deathNum}</div></div>}>
                                {item.name}

                            </List.Item>

                        )
                    })
                }

            </List>


        </div>


    )

}
export default CityDetail;


