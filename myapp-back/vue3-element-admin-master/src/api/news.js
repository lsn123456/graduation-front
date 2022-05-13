import request from '@/utils/request'
export const putnew = data => {
    return request({
        url: '/api/news/newsadd',
        method: 'post',
        data,
    })
}
