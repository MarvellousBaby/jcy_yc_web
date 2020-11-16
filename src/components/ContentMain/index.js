import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//组织
const Organization = LoadableComponent(()=>import('../../routes/Organization/index'))
//用户
const Admin = LoadableComponent(()=>import('../../routes/Admin/index'))
//真烟信息
const Cigarette = LoadableComponent(()=>import('../../routes/Cigarette/index'))


//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>


          <PrivateRoute exact path='/home/system/org' component={Organization}/>
          <PrivateRoute exact path='/home/system/admin' component={Admin}/>
          <PrivateRoute exact path='/home/system/cigarette' component={Cigarette}/>

          <PrivateRoute exact path='/home/about' component={About}/>

          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain