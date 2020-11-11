import React, {Component} from 'react';
import PrivateRoute from './components/PrivateRoute'
import {Route, Switch, withRouter} from 'react-router-dom'
import Login from './routes/Login/index'
// import Login from './routes/Login2/index'
import Index from './routes/Index/index'
import './App.css'
import './assets/font/iconfont.css'
import {inject, observer} from "mobx-react";

@withRouter@inject('appStore')@observer
class App extends Component {

    componentDidMount() {
        console.log("appStore:",this.props.appStore);
        if (!this.props.appStore.isLogin){
            console.log(!this.props.appStore.isLogin);
            this.props.history.push('/login');
        }

    }

  render() {
    return (
      <Switch>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/' component={Index}/>
      </Switch>
    )
  }
}

export default App;
