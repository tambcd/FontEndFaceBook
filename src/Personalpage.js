import './css/Person.css';
import axios from 'axios';
import Post from './Post';
import React, { useEffect, useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Avatar } from '@mui/material';



function Personalpage() {
  const [userinf, setuserinf] = useState([]);

  const [posters, setPosters] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Accounts/userinf?Username=' + localStorage.getItem("uid"),

    }).then(res => {
      setuserinf(res.data[0]);
      



    });

  }, [])
  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Post/userPost?Username=' + localStorage.getItem("uid"),


    }).then(res => {
      setPosters(res.data)

    })
  }, [])
  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {    

      const storage = getStorage();
      const imagesRef = ref(storage, `filestory/${e.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(imagesRef, e.target.files[0]);  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const prog = Math.round(
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgress(prog);  
        },

        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {  
          getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
              var a = url.replace("%", "iii");
              a = a.replace("&", "zzz");
              axios({
                method: 'patch',
                url: 'http://localhost:5000/api/Accounts/updateavatar?id='+ localStorage.getItem("uid")+'&avatar=' + a ,
          
          
              }).then(res => {
                if(res.data = "Update avatar Successfull"){
                  localStorage.setItem("photoURL",a)
                  axios({
                    method: 'get',
                    url: 'http://localhost:5000/api/Accounts/userinf?Username=' + localStorage.getItem("uid"),
              
                  }).then(res => {
                    setuserinf(res.data[0]);
              
              
                  });
                }
          
              })

            })
        }

      )

    
  }
          

  }

  
  const ReAvatar  = ()=>{
    document.getElementById("imageFile").click();
  }
  return (
    <div className="profile-container">
      <input type="file" id='imageFile' accept="image/*" style={{ display: "none" }} onChange={handlechange} />
      <img src={userinf.wall} className="coverImage" alt="" />
      <div className="dashboard">
        <div className="left-dashboard">
          <img src={localStorage.getItem("photoURL").replace("zzz", "&").replace("iii", "%")} className="dashboard-img" alt=""  onClick={ReAvatar}/>
          <div className="left-dashboard-info">
            <h3>{localStorage.getItem("displayName")}</h3>
            {userinf.story&& <p>{userinf.story}</p>}
            <div className="mutual-friend-images">
              <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
              <img src="https://i.pinimg.com/736x/f2/e7/93/f2e79395027b45badc5d9675cd2c6724.jpg" alt="" />
              <img src="https://i.pinimg.com/736x/f2/e7/93/f2e79395027b45badc5d9675cd2c6724.jpg" alt="" />
              <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
              <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />


            </div>
          </div>
        </div>
        <div className="right-dashboard-info">
          <div className="right-dashboard-info-top">
            <button type="button">< PersonAddAltIcon style={{ "align-items": "center" }} />Friends</button>
            <button type="button"><LocalPostOfficeIcon /> messages</button>
          </div>
          <div className="right-div-single-logo"> <a href="#"> <i className="fas fa-ellipsis-h" /></a></div>
        </div>
      </div>
      <div className="container content-profile-container">
        <div className="left-sidebar profile-left-sidebar">
         
          <div className="left-profile-sidebar-top gallery">
            <div className="heading-link profile-heading-link">
              <h4>Photos</h4>
              <a href>All Photos</a>
            </div>
            <div className="gallery-photos">
              <div className="gallery-photos-rowFirst">
                <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
                <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
                <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
                <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
                <img src="images/photo5.png" alt="" />
                <img src="images/photo6.png" alt="" />
              </div>
            </div>
          </div>
          <div className="left-profile-sidebar-top gallery">
            <div className="heading-link profile-heading-link">
              <h4>Friends</h4>
              <a href>All Friends</a>
            </div>
            <div className="gallery-photos">
              <div className="gallery-photos-rowFirst">
                <div className="first-friend">
                  <img src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg" alt="" />
                  <p>Nathan M</p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        {/* main-content------- */}
        <div className="content-area profile-content-area">
          <div className="write-post-container">
            <div className="user-profile">
              <Avatar src={localStorage.getItem("photoURL").replace("zzz", "&").replace("iii", "%")} alt="" />
              <div>
                <p> {localStorage.getItem("displayName")}</p>
                <small>Public <i className="fas fa-caret-down" /></small>
              </div>
            </div>
            <div className="post-upload-textarea">
              <textarea name placeholder={"What's on your mind ?"} id cols={30} rows={3} defaultValue={""} />
              <div className="add-post-links">
                <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/live-video.png?alt=media&token=2eb5314a-b454-4bd1-8541-3b9f8903aa80" alt="" />Live Video</a>
                <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/photo.png?alt=media&token=0f2ac688-e795-4c5b-a19b-25b02ea17fbc" alt="" />Photo/Video</a>
                <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/feeling.png?alt=media&token=d09e294a-9f52-4222-8990-38a93c51edd1" alt="" />Feeling Activity</a>
              </div>
            </div>
          </div>


          {
            posters.map(post => {
              var a = post.Attachments.replace("iii","%");
            a = a.replace("zzz","&");
            var Emoj = "(" + post.Emoj +")";
            var cmt = "(" + post.cmt +")";
            var share = "(" + post.share +")";
              return (
                <div className="status-field-container write-post-container">
                  <Post photoURL={userinf.avatar}
                    image={a}
                    IDTK={post.ID} timestamp={"" + post.Timetams} message={post.Titile} username={localStorage.getItem("displayName")}
                    id={post.ID_Content} like = {Emoj} cmt = {cmt} share = {share} />

                </div>

              )
            })
          }

          <button type="button" className="btn-LoadMore" onclick="LoadMoreToggle()">Load More</button>
        </div>
      </div>
    </div>

  )
}

export default Personalpage