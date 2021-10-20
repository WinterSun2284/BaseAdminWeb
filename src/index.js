import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {commonRoutes} from './routers'
import './index.less';
import App from './App';
import {getToken} from "./utils/localstorage.js"
import './components/service/request'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {/*私有的路由，必须经过验证才能访问*/}
            <Route path={"/admin"} render={(rootProps) => {
                let token = getToken()
                if (token) {
                    return <App {...rootProps}/>
                } else {
                    return <Redirect to={'/login'}/>
                }
            }}/>
            {/*公共的路由*/}
            {
                commonRoutes.map(item => {
                    return (<Route path={item.pathName} component={item.component} key={item.pathName}/>)
                })
            }
            <Redirect from={"/"} to={'/admin'} exact/>
            <Redirect to={'/404'}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

