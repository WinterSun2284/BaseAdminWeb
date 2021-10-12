import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import {commonRoutes} from './routers'
import './index.less';
import App from './App';

ReactDOM.render(
    <HashRouter>
        <Switch>
            {/*私有的路由，必须经过验证才能访问*/}
            <Route path={"/admin"} render={(rootProps) => {
                return <App {...rootProps}/>
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
    </HashRouter>,
    document.getElementById('root'));

