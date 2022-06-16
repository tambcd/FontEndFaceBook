import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Story from './Story'
import './css/Feed.css';
import MessageSender from './MessageSender';
import Post from './Post';
function Feed() {

  const [posts, setPosts] = useState([]);
  const LikePost = () => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Post',

    }).then(res => {
      setPosts(res.data)

    })

  }

  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Post',


    }).then(res => {
      setPosts(res.data)

    })
  }, [])


  return (
    <div className='feed'>
      <Story />
      <MessageSender reLoad={LikePost} />
      {

        posts.map(post => {

          var a = post.Attachments.replace("iii", "%");
          a = a.replace("zzz", "&");
          var Emoj = "(" + post.Emoj + ")";
          var cmt = "(" + post.cmt + ")";
          var share = "(" + post.share + ")";
          return <Post photoURL={post.avatar}
            image={a}
            IDTK={post.ID} timestamp={"" + post.Timetams} message={post.Titile} username={post.namep}
            id={post.ID_Content} like={Emoj} cmt={cmt} share={share} LikePost1={LikePost} />
        })
      }

    </div>
  )
}

export default Feed