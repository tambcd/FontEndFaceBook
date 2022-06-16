import React, { Component } from 'react'
import LeftSidebarFiend from './LeftSidebarFiend'
import MainFriend from './MainFriend'
import './css/Friend.css';


export default class Friend extends Component {
  render() {
    return (
      <div className='Friend'>
      <LeftSidebarFiend/>
      <MainFriend/>
      </div>
    )
  }
}
