import React, { useEffect, useState } from 'react'
import { fetchget } from '../../redux/zgfetch';
import { Link, Outlet } from 'react-router-dom'
import './abroad.scss'

function Abroad(props) {

    return <div className='page-abroad'>
        <div className='link'>
            <Link to="/home/abroad" className='continents'>亚洲</Link>
            <Link to="/home/abroad/africa" className='continents'>非洲</Link>
            <Link to="/home/abroad/europe" className='continents'>欧洲</Link>
            <Link to="/home/abroad/northamerica" className='continents'>北美洲</Link>
            <Link to="/home/abroad/southamerica" className='continents'>南美洲</Link>
            <Link to="/home/abroad/oceania" className='continents'>大洋洲</Link>
        </div>
        < Outlet></Outlet>
    </div>
}
export default Abroad;