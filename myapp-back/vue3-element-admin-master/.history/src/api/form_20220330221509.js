import request from '@/utils/request'
export const formget = () => {
    return request({
        url: '/api/todo/getform',
        method: 'get',

    })
}
