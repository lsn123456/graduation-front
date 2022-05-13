import { Routes, Route, Navigate } from 'react-router-dom'

// 引入页面路由组件
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import NotFound from '../pages/notfound/notfound'
import Home from '../pages/home/home'
import ToDo from '../pages/todo/todo'
import News from '../pages/news/news'
import Notice from '../pages/notice/notice'
import NewsDetail from '../pages/newsdetail/newsdetail'
import NoticeDetail from '../pages/noticedetail/noticedetail'
import PersonalCenter from '../pages/personalCenter/personalCenter'
import CityDetail from '../pages/citydetail/citydetail'
import Setting from '../pages/setting/setting'
import SetPhone from '../pages/setphone/setphone'
import Txnews from '../pages/txnews/txnews'
import Riskarea from '../pages/riskarea/riskarea'
import Information from '../pages/information/information'
import Nearby from '../pages/nearby/nearby'
import Domestic from '../pages/domestic/domestic'
import Abroad from '../pages/abroad/abroad'
import Asia from '../components/asia/asia'
import Africa from '../components/africa/africa'
import Europe from '../components/europe/europe'
import Northamerica from '../components/northamerica/northamerica'
import Southamerica from '../components/southamerica/southemerica'
import Oceania from '../components/oceania/oceania'


export default function RouteMap() {
    return <Routes>
        <Route path='*' element={<NotFound></NotFound>} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home></Home>} >
            <Route index element={<Domestic />} />
            <Route path='abroad' element={<Abroad />} >
                <Route index element={<Asia></Asia>} />
                <Route path='africa' element={<Africa></Africa>} />
                <Route path='europe' element={<Europe></Europe>} />
                <Route path='northamerica' element={<Northamerica></Northamerica>} />
                <Route path='southamerica' element={<Southamerica></Southamerica>} />
                <Route path='oceania' element={<Oceania></Oceania>} />
            </Route>
        </Route>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='/todo' element={<ToDo></ToDo>} />
        <Route path='/news' element={<News></News>} />
        <Route path='/information' element={<Information></Information>}>
            <Route index element={<Txnews />} />
            <Route path='riskarea' element={<Riskarea />} />
            <Route path='nearby' element={<Nearby />} />
        </Route>
        <Route path='/setting' element={<Setting></Setting>} />
        <Route path='/setphone' element={<SetPhone></SetPhone>} />
        <Route path='/notice' element={<Notice></Notice>} />
        <Route path='/newsdetail/:id' element={<NewsDetail></NewsDetail>} />
        <Route path='/noticedetail/:id' element={<NoticeDetail></NoticeDetail>} />
        <Route path='/citydetail/:name' element={<CityDetail></CityDetail>} />
        <Route path='/personalCenter' element={<PersonalCenter></PersonalCenter>} />

    </Routes>
}