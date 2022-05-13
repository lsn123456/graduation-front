import React, { useState, useEffect } from 'react'
import { Toast, Dialog } from 'antd-mobile'
import { Map, Marker, NavigationControl, InfoWindow, Circle, Label } from 'react-bmapgl';
import { fetchget } from '../../redux/zgfetch';
import './nearby.scss'
function Nearby() {
    const [lng, setLng] = useState()
    const [lat, setLat] = useState()
    const [cityname, setCityname] = useState()
    const [infectes, setInfectes] = useState([])

    const getlglt = () => {
        Dialog.confirm({
            content: '浏览器想获取您的当前位置',
            onConfirm: async () => {
                var map = new window.AMap.Map('container', {
                    resizeEnable: true
                });
                window.AMap.plugin('AMap.Geolocation', function () {
                    var geolocation = new window.AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：5s
                        buttonPosition: 'RB',    //定位按钮的停靠位置
                        buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition(function (status, result) {
                        if (status === 'complete') {
                            onComplete(result)
                        } else {
                            onError(result)


                        }
                    });
                });
            },
        })

    }


    //解析定位结果
    const onComplete = async (data) => {
        Toast.show({
            icon: 'success',
            content: '定位成功',
            duration: 1000
        })
        setLng(data.position.R)
        setLat(data.position.Q)
        const baseurl = "/pages/home?"
        const msg = await fetchget(`${baseurl}lon=${data.position.R}&lat=${data.position.Q}`)
        setInfectes(msg.data.shops)
        // console.log(data.position.R, "seccess")
    }
    //解析定位错误信息
    function onError(data) {
        Toast.show({
            icon: 'success',
            content: '无法定位到您的具体位置，具体位置请切换浏览器',
            duration: 2000
        })

        var myCity = new window.BMapGL.LocalCity();
        myCity.get(async (res) => {
            setLng(res.center.lng)
            setLat(res.center.lat)
            setCityname(res.name)
            const baseurl = "/pages/home?"
            const data = await fetchget(`${baseurl}lon=${res.center.lng}&lat=${res.center.lat}`)
            setInfectes(data.data.shops)
        });
    }
    useEffect(() => {
        getlglt()
    }, [])

    return <div className='page-naerby' >
        <div id='container'></div>

        <Map center={{ lng: lng, lat: lat }} zoom="12" enableScrollWheelZoom="true" className='map' >
            <Marker position={{ lng: lng, lat: lat }} icon="loc_red" />
            <Circle center={{ lng: lng, lat: lat }}
                radius={5000}
                strokeColor="#f00"
                strokeWeight={2}
                fillColor="#ff0"
                fillOpacity={0.3}
            />
            <NavigationControl />
            {/* <InfoWindow position={{ lng: lng, lat: lat }} text={cityname} title="当前所在位置" /> */}
            {
                infectes && infectes.map((item, index) => {
                    return (
                        <div key={index}>
                            <Marker position={{ lng: item.location.coordinates[0], lat: item.location.coordinates[1] }} />
                            <Label
                                position={{ lng: item.location.coordinates[0], lat: item.location.coordinates[1] }}
                                text={item.detail_address}
                            />
                        </div>
                    )
                })
            }
        </Map>
    </div>
}
export default Nearby;