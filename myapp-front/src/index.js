import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import md5 from 'js-md5'
import './index.scss'


// React.Component.prototype.$md5 = md5
// 页面渲染
ReactDOM.render((
  <>
    <BrowserRouter>
      <App></App>
      {/* <Tab></Tab> */}
    </BrowserRouter>
  </>
),

  document.getElementById('root')
)



