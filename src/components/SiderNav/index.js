import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },


  {
    title: '真烟信息',
    icon: 'laptop',
    key: '/home/system/cigarette'
  },

  {
    title: '用户',
    icon: 'bars',
    key: '/home/system/admin'
  },

  {
    title: '组织',
    icon: 'desktop',
    key: '/home/system/org'
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/home/about'
  }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        {/*<div style={styles.logo}></div>*/}
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav