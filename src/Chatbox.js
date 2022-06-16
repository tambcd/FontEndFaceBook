import React, { useEffect, useState } from 'react'
import './css/Chatbox.css';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaVideo, FaPhone, FaRegWindowClose } from "react-icons/fa";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { db } from './firebase';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function Chatbox(props) {
  const [image, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [tinnhan, setinnhan] = useState([]);

  const uploadfile = () => {
    document.getElementById("imageFilechat").click();

  }
  const handlechange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }

    toast.success("đã thêm file !!!")

  }


  useEffect(() => {


    const q = query(collection(db, "tinnhan"), orderBy("time", "asc"));

    onSnapshot(q,
      (snapshot) => {
        setinnhan(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
  }, [])

  const closeChat = () => {
    props.closeChat();

  }
  const sendmessage = (e) => {
    e.preventDefault();
    if (message !== "" && image === "") {
      addDoc(collection(db, "tinnhan"), {

        idtkg: localStorage.getItem("IDTK"),
        idtkn: props.current.data.idtk,
        noidung: message,
        time: serverTimestamp()
      });
      setMessage("");
    }
    else if (image !== "") {


      const storage = getStorage();
      const imagesRef = ref(storage, `filechat/${image.name}`);
      const uploadTask = uploadBytesResumable(imagesRef, image);

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
              addDoc(collection(db, "tinnhan"), {

                idtkg: localStorage.getItem("IDTK"),
                idtkn: props.current.data.idtk,
                time: serverTimestamp(),
                image: url,
              });
              if (message !== "") {
                addDoc(collection(db, "tinnhan"), {

                  idtkg: localStorage.getItem("IDTK"),
                  idtkn: props.current.data.idtk,
                  noidung: message,
                  time: serverTimestamp()
                });
              }


              setMessage("");
              setImg("");

            })
        }

      )

    }
  }

  const callvideo = () => {

  }

  return (
    <>
      {props.state ? (
        <div className="chat" id='chat'>
          <ToastContainer style={{ "marginTop": "100px" }} />
          <div className="chat__header">
            <div className="chat__first">
              <div className="chat__header-img">
                <img
                  src={props.current.data.avatar}
                />
              </div>
              <div className="chat__header-name">
                {props.current.data.ten}
              </div>
            </div>
            <div className="chat__second">
              <FaVideo className="chat__header-icons" onClick={callvideo} />
              <FaPhone className="chat__header-icons" />
              <FaRegWindowClose
                className="chat__header-icons"
                onClick={closeChat}
              />
            </div>
          </div>
          <div className="chat__body">

            {
              tinnhan.map(mess => {
                if (mess.data.idtkn === localStorage.getItem("IDTK") && props.current.data.idtk === mess.data.idtkg) {
                  return (
                    <div className="chat__left">
                      {mess.data.image && mess.data.image.split("?")[0].split(".")[mess.data.image.split("?")[0].split(".").length - 1] !== "mp4" && <img width="200" src={image} />}
                      {mess.data.image && mess.data.image.split("?")[0].split(".")[mess.data.image.split("?")[0].split(".").length - 1] === "mp4" && <video width="200" controls>  <source src={image} />
                      </video>}
                      {mess.data.noidung && <p className="msg">{mess.data.noidung}</p>}
                    </div>
                  )
                }
                else if (mess.data.idtkg === localStorage.getItem("IDTK") && props.current.data.idtk === mess.data.idtkn) {
                  return (
                    <div className="chat__right">
                      {mess.data.image && mess.data.image.split("?")[0].split(".")[mess.data.image.split("?")[0].split(".").length - 1] !== "mp4" && <img src={mess.data.image} width="200" />}
                      {mess.data.image && mess.data.image.split("?")[0].split(".")[mess.data.image.split("?")[0].split(".").length - 1] === "mp4" && <video controls width="200">  <source src={mess.data.image} />
                      </video>}
                      {mess.data.noidung && <p className="msg">{mess.data.noidung}</p>}
                    </div>
                  )
                }
              })
            }



          </div>

          <div className="chat__footer">


            <input type="file" id='imageFilechat' accept="image/*,video/*" style={{ display: "none" }} onChange={handlechange} />


            <PhotoLibraryIcon className='photo' onClick={uploadfile} />
            <input type="text" className="chat__input" placeholder="Aa" onChange={e => setMessage(e.target.value)} value={message} />

            <button className='btnsend' onClick={sendmessage}><SendIcon /></button>

          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Chatbox