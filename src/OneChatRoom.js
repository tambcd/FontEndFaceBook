import React from 'react'

function OneChatRoom({img,name,openchat}) {
  return (
    <div className="settings-links" onClick={openchat} >    
    <img src={img} alt="" className="settings-icon" />
    <a href="#">{name}</a>
  </div>
  )
}

export default OneChatRoom