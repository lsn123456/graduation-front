import request from '@/utils/request'
export const getform = data => {
    return request({
        url: '/api/news/newsadd',
        method: 'post',
        data,
    })
}
