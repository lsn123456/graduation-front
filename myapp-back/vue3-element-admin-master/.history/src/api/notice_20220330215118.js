import request from '@/utils/request'
export const putnotice = data => {
    return request({
        url: '/api/notice/noticeadd',
        method: 'post',
        data,
    })
}
