import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './css/MessageSender.css';
import { IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
 import { useStateValue } from './StateProvider';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function MessageSender({reLoad}) {
    const [{ user }, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);

    const [image, setImg] = useState("");
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);

    const handleClose = () => {
        setOpen(false)

    }
    const handleOpen = () => {
        setOpen(true)
    }
    const uploadfile = () => {
        document.getElementById("imageFilepost").click();

    }
    const handlechange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
        toast.success("đã thêm file !!!")


    }
    const uploadPost = (e) => {
        e.preventDefault();
        var today = new Date()  ;
        var daypost = today.getFullYear()+'-'+ Number.parseInt(today.getMonth()+1) +"-"+today.getDate();
        if (image === "") {

            axios({
                method: 'Post',
                url: 'http://localhost:5000/api/Post?ID_Content='+uuidv4()+'&Titile='+message+'&Attachments=null&TypeContent=1&id='+localStorage.getItem("uid")+'&ID_Group=G01&date='+ daypost ,
                    
              }).then(res=>{
                if(res.data ==="Post Added Successfull"){
                
                  toast.success("đã xong!!!")
                  reLoad()
        
                }
                else{
                  toast.error("erro!!!")
                }
              
              })
           
            handleClose();
            setMessage("");
            setImg(null);
            setProgress(0);


        }
        else {

            const storage = getStorage();
            const imagesRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(imagesRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);

                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            var a = url.replace("%","iii");
                            a = a.replace("&","zzz");
                            axios({
                                method: 'Post',
                                url: 'http://localhost:5000/api/Post?ID_Content='+uuidv4()+'&Titile='+message+'&Attachments='+a+'&TypeContent=1&id='+localStorage.getItem("uid")+'&ID_Group=G01&date='+ daypost ,
                                    
                              }).then(res=>{
                                if(res.data ==="Post Added Successfull"){
                                
                                  toast.success("đã xong!!!")
                                  reLoad()
                        
                                }
                                else{
                                  toast.error("erro!!!")
                                }
                              
                              })
                            handleClose();
                            setMessage("");
                            setImg(null);
                            setProgress(0);


                        })
                }

            )

        }

      


    }
    return (
        <>
              <ToastContainer style={{ "marginTop": "100px" }} />

            <Modal open={open} onClose={handleClose} >
                <div className='modal_pop'>
                    <form>
                        <div className='modalHeading'>
                            <h3>Tạo bài viết</h3>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className='modelHeader_top'>
                            <Avatar src={user.photoURL} />
                            <h5>{user.displayName}</h5>
                        </div>
                        <div className='modalBody'>
                            <textarea rows="5" placeholder='Bạn đang nghĩ gì thế' onChange={e => setMessage(e.target.value)}>
                                {message}
                            </textarea>
                        </div>
                        <div className='modalfooter'>
                            <div className='modalfooterleft'>
                                <h4>Thêm vào bài viết </h4>
                            </div>
                            <div className='modalfooterRight'>
                                <IconButton onClick={uploadfile}>
                                    <PhotoLibraryIcon style={{ color: 'lightgreen' }} />
                                </IconButton>
                                <input type="file" id='imageFilepost' accept="image/*,video/*" style={{ display: "none" }} onChange={handlechange} />
                                <IconButton>
                                    <SentimentVerySatisfiedIcon style={{ color: '#ff8f2b' }} />
                                </IconButton>
                                <IconButton>
                                    <LocalOfferIcon style={{ color: 'blue' }} />
                                </IconButton>
                                <IconButton>
                                    <LocationOnIcon style={{ color: '#cd2701' }} />
                                </IconButton>
                                <IconButton>
                                    <FlagCircleIcon style={{ color: 'red' }} />
                                </IconButton>
                            </div>
                        </div>
                       
                        {
                            progress != "" && <progress value={progress} max="100" style={{ "width": "100%", "marginBottom": "20px" }} />
                        }

                        <input type="submit" className='post_submit' href="/" value="Đăng" onClick={uploadPost} />
                    </form>
                </div>
            </Modal>


            <div className='MessageSender'>
                <div className='MessageSender_top'>
                    <Avatar src={localStorage.getItem("photoURL").replace("zzz", "&").replace("iii", "%")} />
                    <form>
                        <input type="text" placeholder='Bạn đang nghĩ gì thế !!! ' onClick={handleOpen} />
                    </form>
                </div>
                <div className='bottom'>
                    <div className='messagerOption'>
                        <VideoCallIcon style={{ color: 'red' }} />
                        <p> Video trực tiếp</p>
                    </div>
                    <div className='messagerOption'>
                        <PhotoLibraryIcon style={{ color: 'lightgreen' }} />
                        <p>Ảnh/Video</p>
                    </div>
                    <div className='messagerOption'>
                        <InsertEmoticonIcon style={{ color: '#ffb100' }} />
                        <p>Cảm xúc/Hoạt động</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageSender