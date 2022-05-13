import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { fetchget } from '../../redux/zgfetch';
function NoticeDetail(props) {

    const [noticecontent, setData] = useState();
    const params = useParams();
    const getNoticeDetail = async () => {
        const detaildata = await fetchget("/api/notice/notice")
        const data = [];

        // eslint - disable - next - line array - callback -return
        detaildata.noticeData.map(item => {
            if (item._id === params.id) {
                data.push(item)
            }

        })
        const noticecontent = data[0];
        setData(noticecontent)


        console.log(detaildata, "detaildata")
    }

    useEffect(() => {
        getNoticeDetail()
    }, [])

    return (

        <div div className='page-newsdetail' >
            <div className='title'>{noticecontent && noticecontent.title}</div>
            <div className='content'>{noticecontent && noticecontent.content}</div>
        </div >
    )
}
export default NoticeDetail;


