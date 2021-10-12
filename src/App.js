import React, {Component} from "react";
import {Switch, Redirect, Route} from 'react-router-dom'
import './App.less';
import {privateRoutes} from "./routers";
import FrameOut from "./components/layout";

class App extends Component {
    render() {
        let routes = []

        for (let i = 0; i < privateRoutes.length; i++) {
            if (i !== 0) {
                let privateRoute = privateRoutes[i];
                if (privateRoute.children) {
                    let children = privateRoute.children;
                    for (let j = 0; j < children.length; j++) {
                        routes.push(
                            <Route path={children[j].pathName} key={children[j].pathName}
                                   component={children[j].component}/>
                        )
                    }

                } else {
                    routes.push(
                        <Route path={privateRoute.pathName} key={privateRoute.pathName}
                               component={privateRoute.component}/>)
                }
            }
        }

        //显示私有的路由
        return (
            <FrameOut>
                <Switch>
                    {
                        routes.map(r => {
                            return r;
                        })
                    }
                    <Route path={privateRoutes[0].pathName} key={privateRoutes[0].pathName}
                           component={privateRoutes[0].component}/>)
                    <Redirect from={'/admin'} to={'/admin'} exact/>
                    <Redirect to={'/404'}/>
                </Switch>
            </FrameOut>
        );
    }
}

export default App;
