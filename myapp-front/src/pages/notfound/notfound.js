import React, { FC } from 'react'
import { ErrorBlock } from 'antd-mobile'
const NotFound: FC = () => {

    return <div className='notfound-page'>  <ErrorBlock status='empty' fullPage="true" /></div>
}
export default NotFound;