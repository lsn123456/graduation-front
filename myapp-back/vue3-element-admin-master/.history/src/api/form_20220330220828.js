import request from '@/utils/request'
export const getform = () => {
    return request({
        url: '/api/news/newsadd',
        method: 'post',

    })
}
