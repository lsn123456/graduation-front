import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchget } from '../../redux/zgfetch';
import './newsdetail.scss'
function NewsDetail(props) {

    const [newscontent, setData] = useState();
    const params = useParams();
    const getNewsDetail = async () => {
        const detaildata = await fetchget("/api/news/news")
        const data = [];
        // eslint-disable-next-line array-callback-return
        detaildata.newsData.map(item => {
            if (item._id === params.id) {
                data.push(item)
            }
        })
        const newscontent = data[0];
        setData(newscontent)


        console.log(newscontent, "newscontent11111")
    }

    useEffect(() => {
        getNewsDetail()
    }, [])

    return (

        <div div className='page-newsdetail' >
            <div className='title'>{newscontent && newscontent.title}</div>
            <div className='content'>{newscontent && newscontent.content}</div>
        </div >
    )
}
export default NewsDetail;


