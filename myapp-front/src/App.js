import React, { memo, useReducer } from 'react';
import RouteMap from './router/index';
// import Tab from './components/tabbar/tabbar';
// import Nav from './components/nav/nav';
import ToggleNav from './components/togglenav';
import ToggleBar from './components/togglebar/togglebar';

import context from './redux/context';
import reducer from './redux/reducer'
function App() {
    let [Login = "false", dispatch] = useReducer(reducer, "false")

    return (
        <>
            <context.Provider value={[Login, dispatch]}>
                <ToggleNav></ToggleNav>
                <RouteMap></RouteMap>
                <ToggleBar></ToggleBar>
            </context.Provider>

        </>
    );
}

export default memo(App);
