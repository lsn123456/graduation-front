import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { fetchget } from '../../redux/zgfetch';
import * as echarts from 'echarts/lib/echarts.js'
import ReactEcharts from 'echarts-for-react';
import { MapChart } from 'echarts/charts';
import china from '../../utils/china.json'
import './home.scss'
import { Button } from 'antd-mobile';

function Home(props) {
    const [mapasymptomNum, setmapasymptomNum] = useState([])//中国地图无症状数据
    const [mapcureNum, setmapcureNum] = useState([])//中国地图治愈数据
    const [deathNum, setdeathNum] = useState([])//中国地图死亡数据z
    var myChart;

    const getcity = async () => {
        const data = await fetchget(`/news/wap/fymap2020_data.d.json`)
        const datacontent = data.data
        const mapasymptomNum = []
        const mapcureNum = []
        const deathNum = []

        datacontent.list.map(item => {
            if (item.name === '北京' || item.name === '上海' || item.name === '重庆' || item.name === '天津') {
                item.name = item.name + '市'
            } else if (item.name === '内蒙古' || item.name === '西藏') {
                item.name = item.name + '自治区'
            } else if (item.name === '新疆') {
                item.name = item.name + '维吾尔自治区'
            } else if (item.name === '广西') {
                item.name = item.name + '壮族自治区'
            } else if (item.name === '宁夏') {
                item.name = item.name + '回族自治区'
            } else if (item.name === '香港' || item.name === '澳门') {
                item.name = item.name + '特别行政区'
            } else {
                item.name = item.name + '省'
            }
            if (item.asymptomNum === '') {
                item.asymptomNum = '0'
            }
            mapasymptomNum.push({
                name: item.name,
                value: item.asymptomNum
            })
            mapcureNum.push({
                name: item.name,
                value: item.cureNum
            })
            deathNum.push({
                name: item.name,
                value: item.deathNum
            })
        })
        mapasymptomNum.push({
            name: '南海诸岛',
            value: '0'
        })
        mapcureNum.push({
            name: '南海诸岛',
            value: '0'
        })
        deathNum.push({
            name: '南海诸岛',
            value: '0'
        })
        setmapasymptomNum(mapasymptomNum)
        setmapcureNum(mapcureNum)
        setdeathNum(deathNum)
        mapOption("china", china, mapasymptomNum)
        console.log(datacontent, "map")
    }
    const getasymptomNum = () => {
        mapOption("china", china, mapasymptomNum)
    }
    const getcureNum = () => {
        mapOption("china", china, mapcureNum)
    }
    const getdeathNum = () => {
        mapOption("china", china, deathNum)
    }

    const mapOption = (mapName, data, mapdata) => {
        if (myChart !== null && myChart !== "" && myChart !== undefined) {
            myChart.dispose();
        }
        myChart = echarts.init(document.querySelector('.map'));

        echarts.registerMap('china', { geoJSON: china })
        var option = {
            title: {
                show: true,
                text: '疫情分布图'
            },
            tooltip: {
                show: true,
                label: {
                    show: true
                }
            },
            series: [
                {
                    name: '数量',
                    type: 'map',
                    zoom: 1.2,
                    top: 50,
                    roam: false,
                    map: 'china',
                    label: {
                        show: false
                    },
                    data: mapdata
                }
            ],
            visualMap: {
                show: true,
                left: 26,
                bottom: 40,
                showLabel: true,
                pieces: [
                    {
                        gte: 100,
                        label: ">10000",
                        color: "#1f307b"
                    },
                    {
                        gte: 500,
                        lt: 999,
                        label: "5000 - 10000",
                        color: "#3c57ce"
                    },
                    {
                        gte: 100,
                        lt: 499,
                        label: "1000 - 5000",
                        color: "#6f83db"
                    },
                    {
                        gte: 10,
                        lt: 99,
                        label: "500 - 1000",
                        color: "#9face7"
                    },
                    {
                        lt: 10,
                        label: '<500',
                        color: "#bcc5ee"
                    }
                ]
            },
            geo: {
                map: 'china',
                geoIndex: 0,
                data: mapdata,
                top: 50,
                label: {
                    show: false,
                },
                roam: false,
                zoom: 1.2,
                emphasis: {
                    areaColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0AFBFF'
                        }, {
                            offset: 1, color: '#0157C9'
                        }],
                        global: false
                    },
                },

            }
        };
        myChart.setOption(option);
    }

    useEffect(() => {
        getcity()

    }, [])

    return (
        <div div className='page-home' >
            <div className='map'></div>
            <div className='btns'>
                <Button className='types' onClick={getasymptomNum}> 无症状</Button>
                <Button className='types' onClick={getcureNum}> 治愈</Button>
                <Button className='types' onClick={getdeathNum}> 死亡</Button>

            </div>
            <div className='hometab'>
                <Link to="/home" className='tabcontent'>国内疫情</Link>
                <Link to="/home/abroad" className='tabcontent'>国外疫情</Link >
            </div>
            <Outlet />

        </div >
    )
}
export default Home;


