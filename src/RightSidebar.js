import React, { useEffect, useState } from 'react'
import './css/Right.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import { db } from './firebase';
import { collection, onSnapshot, orderBy } from "firebase/firestore";


function RightSidebar(props) {
  const [persion,setPersions] =useState([]);
  useEffect(()=>{
    onSnapshot(collection(db,"taikhoan"),
    (snapshot)=>{
      setPersions(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
  },[])
  const openChat = (p) => {
    props.openChat(p);
  };
  
  return (
    <div className='widget'>
      <div className='widget_header'>
        <div className='widget_headerLeft'>
          <h4> Trang của bạn </h4>

        </div>
        <MoreHorizIcon />
      </div>
      <div className='wibget_body'>
       
        <div className='wibget_bodyOption ml10'>
          <NotificationsIcon />
          <p> 1 notifyCation</p>
        </div>
        <div className='wibget_bodyOption ml10'>
          <VolumeUpIcon />
          <p> Create </p>
        </div>
      </div>
      <hr /><br />
      <div className='widget_header'>
        <div className='widget_headerLeft'>
          <h4> Người liên hệ </h4>


        </div>
        <VideoCallIcon />
        <SearchIcon />
        <MoreHorizIcon />
      </div>
      {
          persion.map(p=>{
            if(p.data.idtk!== localStorage.getItem("IDTK")){
              return (
                <div className='wibget_body' style={{"cursor":"pointer"}}  onClick={() => openChat(p)}>
                <div className='wibget_bodyOption ml10'>
                  <Avatar src={p.data.avatar}  />
                  <h4> {p.data.ten}</h4>
                </div>
              </div>
               )

            }
         
        })
      }
      
      
    </div>
  )
}

export default RightSidebar