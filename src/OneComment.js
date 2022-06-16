import { Avatar } from '@mui/material'
import React from 'react'
import './css/comment.css';


function OneComment({ avatarcmt, namecmt, timecmt, titlecmt }) {
    return (

        <div>
            <div className='post_top'>
          <div className='post_topLeft'>
            <Avatar src={avatarcmt.replace("zzz", "&").replace("iii", "%")} />
            <div className='postinfor'>
              <h4>{namecmt} </h4>
              <p>{timecmt} </p>

            </div>
          </div>
        </div>
           
            <div className='bodycmt'>
                <p>{titlecmt}</p>
            </div>

        </div>
    )
}

export default OneComment