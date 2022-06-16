import React, { useEffect, useState } from 'react'
import Post from './Post';
import './css/MainFriend.css';
import OneFiend from './OneFiend';
import { useStateValue } from './StateProvider';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';



function MainFriend() {
  const [{user},dispatch] = useStateValue();
  const [Friend,setFriend] =useState([]);
  useEffect(()=>{
    onSnapshot(collection(db,"taikhoan"),
    (snapshot)=>{
      setFriend(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
  },[])
  return (
    <div className='Friendmain'>
      {
         Friend.map(friend=>{
          if(friend.data.idtk!== localStorage.getItem("IDTK"))
         return <OneFiend Name = {friend.data.ten} srcAvatar = {friend.data.avatar}  typess = "Kết Bạn" />
      })
    }
      
    
    

</div>
  )
}

export default MainFriend