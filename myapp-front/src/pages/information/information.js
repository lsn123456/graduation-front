import React, { useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { Link, Outlet } from 'react-router-dom'
import * as echarts from 'echarts/lib/echarts.js'
import ReactEcharts from 'echarts-for-react';
import './information.scss'

function Information(props) {
    let [time, setTime] = useState([])//折线图时间
    let [confirm, setConfirm] = useState([])//折线图确诊
    let [heal, setHeal] = useState([])//折线图治愈
    let [dead, setDead] = useState([])//折线图死亡
    let [infect, setInfect] = useState([])//折线图无症状

    const getTrend = async () => {
        const data2 = await fetchget(`/g2/getOnsInfo?name=disease_other`)
        const datacontent2 = JSON.parse(data2.data)
        const chinaDayAddList = datacontent2.chinaDayAddList
        const time = []
        const confirm = []
        const heal = []
        const dead = []
        const infect = []
        for (var i = 5; i < chinaDayAddList.length; i = i + 6) {
            time.push(chinaDayAddList[i].date)
            confirm.push(chinaDayAddList[i].confirm)
            heal.push(chinaDayAddList[i].heal)
            dead.push(chinaDayAddList[i].dead)
            infect.push(chinaDayAddList[i].infect)
        }
        setTime(time)
        setConfirm(confirm)
        setHeal(heal)
        setDead(dead)
        setInfect(infect)
    }

    const getOption = () => {

        let option = {
            // title: {
            //     text: '每日新增'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['确诊', '治愈', '死亡', '无症状']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '确诊',
                    type: 'line',
                    stack: 'Total',
                    data: confirm
                },
                {
                    name: '治愈',
                    type: 'line',
                    stack: 'Total',
                    data: heal
                },
                {
                    name: '死亡',
                    type: 'line',
                    stack: 'Total',
                    data: dead
                },
                {
                    name: '无症状',
                    type: 'line',
                    stack: 'Total',
                    data: infect
                },

            ]
        };
        return option;
    };


    useEffect(() => {
        getOption()
        getTrend()
    }, [])

    return <div className='page-information'>

        <ReactEcharts option={getOption()} className="echarts" />

        <div className='infotabcontanter'>
            <Link to="/information" className='infotab'>资讯速递</Link>
            <Link to="/information/riskarea" className='infotab'>风险地区</Link >
            <Link to="/information/nearby" className='infotab'>周边疫情</Link >
        </div>
        <Outlet />

    </div>
}
export default Information;