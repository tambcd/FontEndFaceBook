import React from 'react'
import Avatar from '@mui/material/Avatar';



function OneStory({srcAvatar,srcStory,title}) {
  return (
    <div className='story' style={{backgroundImage: `url(${srcStory})`}}>
        {srcAvatar && <Avatar src = {srcAvatar}/>}
        <h4>{title} </h4>
    </div>
  )
}

export default OneStory