import React from 'react'
import Avatar from '@mui/material/Avatar';
import './css/SidebarRow.css';



function SideBarOption({src,Icon,title}) {
  return (
    <div className='sidebarRow'>
        {src && <Avatar src={src.replace("zzz", "&").replace("iii", "%")} />}
        {Icon && <Icon/>}
        <p>{title}</p>
        </div>
  )
}

export default SideBarOption