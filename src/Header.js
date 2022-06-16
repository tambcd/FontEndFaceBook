import React, { useEffect, useState } from 'react'
import './css/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useStateValue } from './StateProvider';
import { FaFacebookMessenger, FaBell } from "react-icons/fa";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import OneChatRoom from './OneChatRoom';
import MiniChatBox from './MiniChatBox';
import Axios from 'axios';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';







function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [ListRoom, setRoomchat] = useState([]);
  const [Rooms, setidRoom] = useState([]);
  const [messageRoom, setRoommessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImg] = useState("");
  const [message, setMessage] = useState("");




  const openminichat = (idRoom, name, avatarGE) => {
    setidRoom({ id: idRoom, name: name, avatar: avatarGE });
    Axios({
      method: 'get',
      url: 'http://localhost:5000/api/Message?id=' + idRoom,
    }).then(res => {
      console.log(res.data);
      setRoommessage(res.data)

    })


    document.querySelector(".minichat").classList.add("user-setting-showup-toggle");
    document.querySelector(".all-notify").classList.remove("user-setting-showup-toggle");
    document.querySelector(".all-messgae").classList.remove("user-setting-showup-toggle");

  }
  const closeminichat = () => {
    document.querySelector(".minichat").classList.remove("user-setting-showup-toggle");
  }

  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/ChatRoom?id=' + localStorage.getItem("uid"),
    }).then(res => {
      setRoomchat(res.data)

    })
  }, [])
  const LoadAllRoom = ()=>{
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/ChatRoom?id=' + localStorage.getItem("uid"),
    }).then(res => {
      setRoomchat(res.data)

    })
  }

  const toInfor = () => {
    document.getElementById("topagecn").click();

  }
  const logout = () => {
    localStorage.clear();
    document.getElementById('backlogin').click();

  }
  const UserSettingToggle = () => {
    document.querySelector(".user-settings").classList.toggle("user-setting-showup-toggle");
    document.querySelector(".all-notify").classList.remove("user-setting-showup-toggle");
    document.querySelector(".all-messgae").classList.remove("user-setting-showup-toggle");


  }
  const Listnotify = () => {
    document.querySelector(".all-notify").classList.toggle("user-setting-showup-toggle");
    document.querySelector(".user-settings").classList.remove("user-setting-showup-toggle");
    document.querySelector(".all-messgae").classList.remove("user-setting-showup-toggle");

  }
  const ChatRoom = () => {
    document.querySelector(".all-messgae").classList.toggle("user-setting-showup-toggle");
    document.querySelector(".user-settings").classList.remove("user-setting-showup-toggle");
    document.querySelector(".all-notify").classList.remove("user-setting-showup-toggle");

  }
  const uploadfile = () => {
    document.getElementById("imageFilechat1").click();

  }
  const handlechange = (e) => {
    
    if (e.target.files[0]) {
      console.log(e.target);
      setImg(e.target.files[0]);
      toast.success("đã câp nhâp ảnh!!!")
    }


  }
  const handleClose = () => {
    setOpen(false)

  }
  const handleOpen = () => {

    setOpen(true)
   

  }
  const CreateChatRoom = (e) => {
    e.preventDefault();
    if (image !== "" && message !== "") {
      const storage = getStorage();
      const imagesRef = ref(storage, `filechat/${image.name}`);
      const uploadTask = uploadBytesResumable(imagesRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (error) => {
          alert(error.message);
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
              var a = url.replace("%", "iii");
              a = a.replace("&", "zzz");
              Axios({
                method: 'Post',
                url: 'http://localhost:5000/api/ChatRoom/CreateRoom?ID_RoomChat=' + uuidv4() + '&Name_RoomChat=' + message + '&avatar=' + a + '&idtk=' + localStorage.getItem("uid"),
              }).then(res => {
                if (res.data === " Added Successfull") {
                  axios({
                    method: 'get',
                    url: 'http://localhost:5000/api/ChatRoom?id=' + localStorage.getItem("uid"),
                  }).then(res => {
                    setRoomchat(res.data)
              
                  })

                }

              })
              setMessage("");
              setImg("");

            })
        }
      )
    }
    else {
      toast(" Xin hãy nhập đủ thông tin !!!")
    }

  }

  return (
    <>
      <Modal open={open} onClose={handleClose}  >
        <div className='modal_pop' style={{ "width": "270px" }}>          
          <form>            
            <div className='modalHeading'>
              <h3>Tạo nhóm chat</h3>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modalBody' style={{ "height": "100px", "overflow-y": "auto" }}>
              <div style={{ "display": "flex" }}>
                <input type="file" id='imageFilechat1' accept="image/*" style={{ display: "none" }} onChange={handlechange} />

                <AddAPhotoIcon style={{ "marginRight": "10px" }} onClick={uploadfile} />
                <input type="text" placeholder='Name Group ...' style={{ "marginRight": "10px" }} onChange={e => setMessage(e.target.value)} value={message} />
                <button style={{ "backgroundColor": "#c72544", "color": "#ffffff" }} onClick={CreateChatRoom}>Tạo</button>

              </div>
            </div>

          </form>
        </div>
      </Modal>
      <div className='header'>
        <div className='header_left'>
          <a href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' />
          </a>
          <div className='header_search'>
            <SearchIcon />
            <input type="text" placeholder='Search Facebook' />

          </div>
        </div>

        <div className='header_mid'>
          <a href='/'>
            <div className='header_option header_option--active'>
              <HomeIcon fontSize='large' />

            </div>
          </a>
          <a href='/Friend'>
            <div className='header_option'>
              <GroupIcon fontSize='large' />

            </div>
          </a>
          <a href='/watch'>
            <div className='header_option'>
              <OndemandVideoIcon fontSize='large' />

            </div></a>
          <a href='/map'>
            <div className='header_option'>
              <AddLocationAltIcon fontSize='large' />

            </div>
          </a>

        </div>
        <div className='header_right'>
          <div className='header_infor' style={{ "cursor": "pointer" }} onClick={toInfor}>
            <a href='/personal_page' id='topagecn' style={{ "display": "none" }}>
            </a>
            <Avatar src={user.photoURL.replace("zzz", "&").replace("iii", "%")} />
            <h5>{user.displayName}</h5>
          </div>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <IconButton onClick={ChatRoom}>
            <FaFacebookMessenger className="navbar__middle-icons" />
            <span className="navbar__notify">3</span>
          </IconButton>
          <div className="all-messgae">
            <div className="profile-darkButton">
              <div className="user-profile" >
                <div >

                  <IconButton style={{ "display": "flex", "marginLeft": "150px" }}>
                    <h4>chat</h4>
                    <AddIcon style={{ "display": "flex", "marginLeft": "250px" }} onClick={handleOpen} />
                  </IconButton>



                </div>
              </div>

            </div>
            <hr />
            <div className="user-profile" >
              <div>
                <div className='header_search' >
                  <SearchIcon />
                  <input type="text" placeholder='Search Messenger' width="200px" />
                </div>
              </div>
            </div>
            <hr />
            {
              ListRoom.map(cmt => {
                var a = cmt.avatar.replace("iii", "%");
                a = a.replace("zzz", "&");
                return <OneChatRoom name={cmt.Name_RoomChat} img={a} openchat={(id, name, avatar) => openminichat(cmt.ID_RoomChat, cmt.Name_RoomChat, a)} />
              })
            }

          </div>
          <IconButton onClick={Listnotify}>
            <FaBell className="navbar__middle-icons" />
            <span className="navbar__notify">3</span>
          </IconButton>
          <div className="all-notify">

            <div className="settings-links">
              <CircleNotificationsIcon/>
              <a href="#">Thông Báo </a>
            </div>
            
          </div>
          <IconButton>
            <ExpandMoreIcon onClick={UserSettingToggle} />

          </IconButton>


        </div>
        <div className="user-settings" style={{"z-index": "999"}}>
            <a href='/' id='backlogin' style={{"display":"none"}}></a>
          <div className="user-profile">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebookclone-14463.appspot.com/o/filestory%2Ffeedback.png?alt=media&token=568737b2-b7db-4b1d-99a5-9322b282b6f8" alt="" />
            <div>
              <p> Give Feedback</p>
              <a href="#">Help us to improve</a>
            </div>
          </div>
          <hr />
          <div className="settings-links">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebookclone-14463.appspot.com/o/filestory%2Fsetting.png?alt=media&token=c23f355c-eed4-4340-9bef-ed71a35dbcb1" alt="" className="settings-icon" />
            <a href="#">Settings &amp; Privary <img src="images/arrow.png" alt="" /></a>
          </div>
          <div className="settings-links">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebookclone-14463.appspot.com/o/filestory%2Fhelp.png?alt=media&token=71f218f9-4099-4cca-8e5d-2cb0e4d7f253" alt="" className="settings-icon" />
            <a href="#">Help &amp; Support <img src="images/arrow.png" alt="" /></a>
          </div>
          <div className="settings-links">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebookclone-14463.appspot.com/o/filestory%2Fdisplay.png?alt=media&token=a2409bd2-1e54-4533-ac6d-feeeab7d1322" alt="" className="settings-icon" />
            <a href="#">Display &amp; Accessibility <img src="images/arrow.png" alt="" /></a>
          </div>
          <div className="settings-links" onClick={logout}>
            <img src="https://firebasestorage.googleapis.com/v0/b/facebookclone-14463.appspot.com/o/filestory%2Flogout.png?alt=media&token=3ee2a105-b7e7-45a9-8380-c9690f2495a0" alt="" className="settings-icon" />
            <a href="#" >Logout <img src="images/arrow.png" alt="" /></a>
          </div>
        </div>

        {<MiniChatBox closechat={closeminichat} id={Rooms.id} name={Rooms.name} avatar1={Rooms.avatar} listMessage={messageRoom} loaddata={(id, name, avatar) => openminichat(Rooms.id, Rooms.name, Rooms.avatar)} loadRoomchat = {LoadAllRoom}/>}

      </div>
    </>
  )
}

export default Header