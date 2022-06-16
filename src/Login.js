import { IconButton, Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './css/Login.css';
import CloseIcon from '@mui/icons-material/Close';

import { useStateValue } from './StateProvider';
import { ToastContainer, toast } from 'react-toastify';



function Login() {
  
  const [{ }, dispatch] = useStateValue();
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");

  const [usernameSG, setusernameSG] = useState("");
  const [passSG, setpassSG] = useState("");
  const [RepassSG, setRepassSG] = useState("");
  const [emailSG, setemail] = useState("");
  const [FistName, setFistName] = useState("");
  const [LastName, setLastName] = useState("");
  const [islogin, setlogin] = useState(false);

  

  const [open, setOpen] = useState(false);

  if (Object.keys(localStorage).length !== 0) {
    dispatch({
      type: "SET_USER",
      user: {
        displayName: localStorage.getItem("displayName"),
        photoURL: localStorage.getItem("photoURL")

      }

    })
  }
  const LoginUser = (e) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Accounts/?Username=' + username + '&Password=' + pass,


    }).then(res => {
      
        localStorage.setItem("uid", res.data[0].ID)
        localStorage.setItem("displayName", res.data[0].FirsName + " " + res.data[0].lastName)
        localStorage.setItem("photoURL", res.data[0].avatar)      
      document.getElementById('login').click();
      setlogin(true);
    

    });

    if(!islogin){      
        toast.error("tài khoản mật khẩu không đúng ")
      
    }

      
  }
  const handleClose = () => {
    setOpen(false)

  }
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true)
  }
  const CreateAcc = (e) => {
    e.preventDefault();
    if (LastName !== "" && FistName !== "" && emailSG !== "" && passSG !== "" && passSG === RepassSG && usernameSG !== "") {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/Accounts?id='+usernameSG+'&passw='+passSG+'&lastName='+LastName+'&firstName='+FistName+'&email='+emailSG ,


      }).then(res => {
        if (res.data === "Added Successfull") {
          toast("Đăng Kí thành công !!!")
          setLastName("");
          setFistName("");
          setemail("");
          setRepassSG("");
          setpassSG("");
          setusernameSG("")
          handleClose();

        }
        else {
          toast.error("Tên Tài khoản tồn tại !!! ")
        }

      })
    }
    else{
      toast.error("thông tin chưa chính xác !!! ")
    }

    


  }
  return (
    <>
    <a href='/' style={{"display":"none"}} id = 'login'></a>
    <ToastContainer style={{ "marginTop": "100px" }} />
      <Modal open={open} onClose={handleClose} >
        <div className='modal_pop'>
          <form>
            <div className='modalHeading'>
              <h3>create account </h3>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modalBody'>
              <div>
                <input type="text" placeholder="Username" onChange={e => setusernameSG(e.target.value)} value={usernameSG} className="iP1" />
              </div>
              <div>
                <input type="email" placeholder="Email" onChange={e => setemail(e.target.value)} value={emailSG} className="iP1" />
              </div>
              <div>
                <input type="password" placeholder="Password" onChange={e => setpassSG(e.target.value)} value={passSG} className="iP1" />
              </div>
              <div>
                <input type="password" placeholder="Confirm Password" onChange={e => setRepassSG(e.target.value)} value={RepassSG} className="iP1" />
              </div>
              <div className="iP2" >
                <input type="text" placeholder="FistName" onChange={e => setFistName(e.target.value)} value={FistName} className="iP" />
                <input type="text" placeholder="LastName" onChange={e => setLastName(e.target.value)} value={LastName} className="iP" />
              </div>
              <div>
                <button className="iP1" onClick={CreateAcc}> Create</button>
              </div>
            </div>

          </form>
        </div>
      </Modal>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" id='user' onChange={e => setusername(e.target.value)} value={username} />
            <label>Username</label>
          </div>
          <div className="user-box" >
            <input type="password" id='pass' onChange={e => setpass(e.target.value)} value={pass} />
            <label>Password</label>
            <p >Forgot password?</p>
          </div>
          <button id='login' onClick={LoginUser}>
            <span />
            <span />
            <span />
            <span />
            Login
          </button >
          <button id='dk' onClick={handleOpen}>
            <span />
            <span />
            <span />
            <span />
            create account
          </button>
        </form>
      </div>
    </>
  )
}

export default Login