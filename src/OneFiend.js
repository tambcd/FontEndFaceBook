import React from 'react'
import './css/OneFriend.css';


function OneFiend({srcAvatar,Name,typess}) {
  return (
    <div className='OneFriend'>
      <img src={srcAvatar}>
      </img>
      <p>{Name}</p>
      <br/>
      <button className='btn1' >{typess}</button>
      <button className='btn2'> Xóa</button>
    </div>
  )
}

export default OneFiend