import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import Avatar from '@mui/material/Avatar';
import { IconButton, Modal } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';



function MiniChatBox({ closechat, id, name, avatar1, listMessage, loaddata, loadRoomchat }) {
    const [image, setImg] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [isroom, setisroom] = useState(false);
    const [userchat, setuserchat] = useState([]);
    const [member, setmember] = useState([]);
    const [isadmin, setisadmin] = useState(false);





    const deleteMessage = (idmess) => {
        if (window.confirm('Bạn có muốn gỡ tin nhắn?')) {
            Axios({
                method: 'patch',
                url: 'http://localhost:5000/api/Message?id=' + idmess,
            }).then(res => {
                loaddata();
            })
        }
    }

    const uploadfilechat = () => {
        document.getElementById("imageFilechat113").click();
    }
    const handlechangechat = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
            toast("đã thêm file !!!")
        }
    }
    const sendmessage = (e) => {
        e.preventDefault();
        var daypost = Math.round(+new Date() / 1000);

        if (message !== "" && image === "") {
            Axios({
                method: 'Post',
                url: 'http://localhost:5000/api/Message?ID=' + uuidv4() + '&Titile=' + message + '&date=' + daypost + '&Attachments=null&ID_RoomChat=' + id + '&idtk=' + localStorage.getItem("uid"),
            }).then(res => {
                setMessage("");
                setImg("");
                loaddata();
            })
        }
        else if (image !== "" && message !== "") {
            const storage = getStorage();
            const imagesRef = ref(storage, `filechat/${image.name}`);
            const uploadTask = uploadBytesResumable(imagesRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
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
                            Axios({
                                method: 'Post',
                                url: 'http://localhost:5000/api/Message?ID=' + uuidv4() + '&Titile=' + message + '&date=' + daypost + '&Attachments=' + a + '&ID_RoomChat=' + id + '&idtk=' + localStorage.getItem("uid"),
                            }).then(res => {
                                setMessage("");
                                setImg("");
                                loaddata();
                            })

                            setMessage("");
                            setImg("");

                        })
                }
            )

        }
        else if (image !== "" && message === "") {


            const storage = getStorage();
            const imagesRef = ref(storage, `filechat/${image.name}`);
            const uploadTask = uploadBytesResumable(imagesRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
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
                            Axios({
                                method: 'Post',
                                url: 'http://localhost:5000/api/Message?ID=' + uuidv4() + '&Titile=null&date=' + daypost + '&Attachments=' + a + '&ID_RoomChat=' + id + '&idtk=' + localStorage.getItem("uid"),
                            }).then(res => {
                                setMessage("");
                                setImg("");
                                loaddata();
                            })

                            setMessage("");
                            setImg("");

                        })
                }

            )

        }
    }
    const handleClose = () => {
        setOpen(false)

    }
    const addMeber = () => {
        setisroom(true)
        dataAddmember();
        handleOpen();


    }
    const dataAddmember = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:5000/api/Accounts/alluserchat?id=' + id,
        }).then(res => {
            setuserchat(res.data);
            setmember([]);

        })
    }
    const updateMember = () => {
        setisroom(false)
        dataupdateMember();
        handleOpen();

    }
    const dataupdateMember = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:5000/api/ChatRoom/userinRoom?id=' + id,
        }).then(res => {
            
            setmember(res.data);
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].ID === localStorage.getItem("uid") && res.data[i].permission===1) {
                    setisadmin(true);  
                    break;

                }
                else {
                    
                    setisadmin(false);
                }
            }

        })
    }
    const handleOpen = () => {

        setOpen(true)


    }
    const addchatroom = (idusers) => {
        Axios({
            method: 'post',
            url: 'http://localhost:5000/api/ChatRoom?nickname=null&ID=' + idusers + '&ID_RoomChat=' + id,
        }).then(res => {
            if (res.data === " Added Successfull") {
                dataAddmember();
            }
            else {
                alert("erro")
                dataAddmember();
            }


        })
    }
    const GroupFrom = () => {
        if (window.confirm('Bạn có muốn rời khỏi nhóm không?')) {
            Axios({
                method: 'delete',
                url: 'http://localhost:5000/api/ChatRoom?ID=' + localStorage.getItem("uid") + '&ID_RoomChat=' + id,
            }).then(res => {
                if (res.data === "Delete Successfull") {

                    
                    closechat();
                    loadRoomchat();

                }
                else {
                    alert("erro")
                }

            })
        }
    }
    const deletmember = (id,idRoom,name) => {
        if (window.confirm('Bạn có muốn xóa ' +name+' khỏi nhóm không ?')) {
            Axios({
                method: 'delete',
                url: 'http://localhost:5000/api/ChatRoom?ID=' + id + '&ID_RoomChat=' + idRoom,
            }).then(res => {
                if (res.data === "Delete Successfull") {
                    
                    dataupdateMember();

                }
                else {
                    alert("erro")
                    dataupdateMember();
                }

            })
        }

    }
    return (
        <>
            <Modal open={open} onClose={handleClose}  >
                <div className='modal_pop' style={{ "width": "270px" }}>
                    <form>
                        <div className='modalHeading'>
                            {isroom && <h3>Thêm Thành Viên</h3>}
                            {!isroom && <h3> Thành Viên</h3>}
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div className='modalBody' style={{ "height": "230px", "overflow-y": "auto" }}>
                            {
                                isroom && userchat.map(userrc => {
                                    return (
                                        <div style={{ "display": "flex", "marginBottom": "5px" }}>
                                            <Avatar src={userrc.avatar.replace("iii", "%").replace("zzz", "&")} style={{ "marginLeft": "20px" }} />
                                            <h4 style={{ "paddingLeft": "20px", "paddingtop": "15px" }}>{userrc.namep}</h4>
                                            <AddBoxIcon style={{ "paddingLeft": "25px" }} onClick={(iduser) => addchatroom(userrc.ID)} />
                                        </div>
                                    )

                                })
                            }
                            {
                                !isroom && member.map(userrcs => {
                                    return (
                                        <div style={{ "display": "flex", "marginBottom": "5px" }}>
                                            <Avatar src={userrcs.avatar.replace("iii", "%").replace("zzz", "&")} style={{ "marginLeft": "20px" }} />
                                            
                                            <h4 style={{ "paddingLeft": "20px", "paddingtop": "15px" }}>{userrcs.namep}</h4>
                                            
                                            {isadmin && <HighlightOffIcon style={{ "paddingLeft": "25px" }} onClick={(iduser,idRoom,name) => deletmember(userrcs.ID,userrcs.ID_RoomChat,userrcs.namep)} />}
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="minichat"  >
                <div className="chat__header">
                    <div className="chat__first">
                        <div className="chat__header-img">

                            <img src={avatar1} />
                        </div>
                        <div className="chat__header-name">
                            {name}
                        </div>
                    </div>
                    <div className="chat__second">
                        <GroupIcon className="chat__header-icons" onClick={updateMember} /> <label className='box-list-icons' >Thành viên</label>
                        <PersonAddAltIcon onClick={addMeber} className="chat__header-icons" />
                        <LogoutIcon className="chat__header-icons" onClick={GroupFrom} />
                        <CloseIcon
                            className="chat__header-icons" onClick={closechat} />
                    </div>
                </div>

                <div className="chat__body">

                    {
                        listMessage.map(mess => {


                            if (mess.ID === localStorage.getItem("uid")) {
                                if (mess.typess === 0) {
                                    return (<div className="chat__right">
                                        {mess.Attachments !== "null" && mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".")[mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".").length - 1] !== "mp4" && <img src={mess.Attachments.replace("iii", "%").replace("zzz", "&")} width="200" />}
                                        {mess.Attachments !== "null" && mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".")[mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".").length - 1] === "mp4" && <video controls width="200">  <source src={mess.Attachments.replace("iii", "%").replace("zzz", "&")} />
                                        </video>}
                                        <span><IconButton onClick={(id) => deleteMessage(mess.ID_message)}><DeleteForeverIcon /></IconButton></span> {mess.content !== "null" && <p >{mess.content}</p>}
                                    </div>)

                                }
                                else {
                                    return (<div className="chat__right" style={{ "backgroundColor": "transparent", "border": "2px", "color": "#000" }}>
                                        <p>Tin nhắn đã được thu hồi </p>
                                    </div>)
                                }
                            } else {
                                if (mess.typess === 0) {
                                    return (<div className="chat__left">
                                        <Avatar style={{ "width": "30px", "height": "30px" }} src={mess.avatar.replace("iii", "%").replace("zzz", "&")} />
                                        {mess.Attachments !== "null" && mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".")[mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".").length - 1] !== "mp4" && <img src={mess.Attachments.replace("iii", "%").replace("zzz", "&")} width="200" />}
                                        {mess.Attachments !== "null" && mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".")[mess.Attachments.replace("iii", "%").replace("zzz", "&").split("?")[0].split(".").length - 1] === "mp4" && <video controls width="200">  <source src={mess.Attachments.replace("iii", "%").replace("zzz", "&")} />
                                        </video>}

                                        {mess.content !== "null" && <p >{mess.content}</p>}
                                    </div>)
                                }
                                else {
                                    return (<div className="chat__left">
                                        <Avatar style={{ "width": "30px", "height": "30px" }} src={mess.avatar} />
                                        <p>Tin nhắn đã được thu hồi </p>
                                    </div>)
                                }
                            }
                        })
                    }
                </div>
                <div className="chat__footer1">
                    <input type="file" id='imageFilechat113' accept="image/*,video/*" style={{ display: "none" }} onChange={handlechangechat} />
                    <PhotoLibraryIcon className='photo' onClick={uploadfilechat} />
                    <input type="text" className="chat__input" placeholder="Aa" onChange={e => setMessage(e.target.value)} value={message} />
                    <button className='btnsend' onClick={sendmessage}><SendIcon /></button>
                </div>
            </div>
        </>
    )
}

export default MiniChatBox