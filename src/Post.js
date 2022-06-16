import React, { useEffect, useState } from 'react'
import './css/Post.css';
import axios from 'axios';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, IconButton, Modal } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import OneComment from './OneComment';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';





function Post({ id, photoURL, image, username, timestamp, message, IDTK, like, cmt, share, LikePost1 }) {
  const [open, setOpen] = useState(false);

  const [comments, setcmts] = useState([]);
  const [idemoj, setidemoj] = useState("");
  const [Emojs, setEmojs] = useState("https://binhduongconstruction.com/wp-content/uploads/2020/04/icon-like.png");
  const [titlecmt, settitlecmt] = useState("");
  const [colortxt, setcolortxt] = useState("0");

  const DeleteEmoj = () => {

    axios({
      method: 'delete',
      url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj,

    }).then(res => {
      if (res.data === "delete emoj Successfull") {
        LikePost1()
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

        }).then(res => {
          var a = res.data[0].TypeEmotion.replace("iii", "%");
          a = a.replace("zzz", "&");
          setEmojs(a);
          setcolortxt(res.data[0].nameEmoj)
          setidemoj(res.data[0].ID_emotion)

        })

      }
      else {
        toast.error("erro!!!")
      }

    })
  }
  const LikePost = () => {

    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/like.png?alt=media&token=32203493-a592-49b7-bb13-4e054cc09624"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=1',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1()
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=1',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }


  }

  const FavoritePost = () => {
    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/tim.png?alt=media&token=d3c8d667-d243-4016-a883-6731d409d5d9"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=2',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=2',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }


  }
  const HahaPost = () => {
    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/HAHA.png?alt=media&token=252ba47f-efbf-4485-8e24-8d2af2ca65eb"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=3',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=3',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }

  }

  const WowPost = () => {
    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/WOW.png?alt=media&token=c5bc88e2-c5ce-4245-b76d-5dca5c46aa64"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=4',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=4',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }


  }
  const SadPost = () => {
    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/SAD.png?alt=media&token=561fe70c-6c2a-4e6a-8eb1-37a62b10bb9c"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=5',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=5',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }

  }

  const PhannoPost = () => {
    var a = "https://firebasestorage.googleapis.com/v0/b/clonemessage-d9800.appspot.com/o/phanno.png?alt=media&token=9caa541b-61f2-423c-bcc5-c7dd4a0afaf1"
    a = a.replace("%", "iii");
    a = a.replace("&", "zzz");
    if (colortxt === "0") {
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Emoj?ID_emotion=' + uuidv4() + '&TypeEmotion=' + a + '&ID_Content=' + id + '&Idcmt=null&id=' + localStorage.getItem("uid") + '&nameEmoj=6',

      }).then(res => {
        if (res.data === "like Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })
    }
    else {
      axios({
        method: 'Patch',
        url: 'http://localhost:5000/api/Emoj?idEm=' + idemoj + '&typeEm=' + a + '&nameEm=6',

      }).then(res => {
        if (res.data === "Update emoj Successfull") {

          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

          }).then(res => {
            var a = res.data[0].TypeEmotion.replace("iii", "%");
            a = a.replace("zzz", "&");
            setEmojs(a);
            setcolortxt(res.data[0].nameEmoj)
            setidemoj(res.data[0].ID_emotion)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })

    }


  }


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Comments',

    }).then(res => {
      setcmts(res.data)

    })

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Emoj?idPost=' + id + '&id=' + localStorage.getItem("uid"),

    }).then(res => {
      var a = res.data[0].TypeEmotion.replace("iii", "%");
      a = a.replace("zzz", "&");
      setEmojs(a);
      setcolortxt(res.data[0].nameEmoj)
      setidemoj(res.data[0].ID_emotion)


    })

  }, [])
  const handleClose = () => {
    setOpen(false)
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/Comments',

    }).then(res => {
      setcmts(res.data);

    })

  }
  const handleOpen = () => {
    setOpen(true)
  }
  const sendcmt = (e) => {
    e.preventDefault();
    if (titlecmt !== "") {
      var today = new Date();
      var daypost = today.getFullYear() + '-' + Number.parseInt(today.getMonth() + 1) + "-" + today.getDate();
      axios({
        method: 'Post',
        url: 'http://localhost:5000/api/Comments?idcmt=' + uuidv4() + '&Titile=' + titlecmt + '&Attachments= null' + '&id=' + localStorage.getItem("uid") + '&ID_Content=' + id + '&date=' + daypost,


      }).then(res => {
        if (res.data == "Comment Added Successfull") {
          LikePost1();
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/Comments',

          }).then(res => {
            setcmts(res.data)

          })

        }
        else {
          toast.error("erro!!!")
        }

      })


    }
    settitlecmt("");
  }

  return (
    <>
      <ToastContainer />
      <Modal open={open} onClose={handleClose} >
        <div className='modal_pop'>
          <form>
            <div className='modalHeading'>
              <h3>Bình Luận</h3>
              <IconButton onClick={handleClose}>
                <CloseIcon />

              </IconButton>
            </div>

            <div className='comment'>

              <div className='Listcomment'>
                {
                  comments.map(cmt => {
                    if (cmt.ID_Content === id) {

                      return <OneComment namecmt={cmt.namep} avatarcmt={cmt.avatar}
                        timecmt={cmt.Timetams} titlecmt={cmt.Titile} />
                    }

                  })
                }



              </div>
              <div className='sendcomment'>

                <input type=" text" placeholder='Viết bình luận.....' onChange={e => settitlecmt(e.target.value)} value={titlecmt}></input>
                <button onClick={sendcmt}> <SendIcon /></button>

              </div>
            </div>

          </form>
        </div>
      </Modal>
      <div className='post'>
        <div className='post_top'>
          <div className='post_topLeft'>
            <Avatar src={photoURL.replace("zzz", "&").replace("iii", "%")} />
            <div className='postinfor'>
              <h4>{username} </h4>
              <p>{timestamp}<PublicIcon /> </p>

            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className='post_mid'>
          <p>{message}</p>


          {image !== "null" && image.split("?")[0].split(".")[image.split("?")[0].split(".").length - 1] !== "mp4" && <img src={image} />}
          {image !== "null" && image.split("?")[0].split(".")[image.split("?")[0].split(".").length - 1] === "mp4" && <video controls>  <source src={image} />
          </video>}


        </div>

        <div className='post_bottom'>
          <div className='post_bottomOption'>
            <div className="post-footer">
              <a className="icon-hover" href="#">
                <div onClick={DeleteEmoj}>
                  <img src={Emojs} width="25px" /> {colortxt === "1" && <span style={{ "color": "blue" }}>Thích</span>} {colortxt === "0" && "Thích"}
                  {colortxt === "2" && <span style={{ "color": "#FA383E" }}>Yêu thích</span>} {colortxt === "3" && <span style={{ "color": "#F5C33B" }}>Haha</span>}
                  {colortxt === "4" && <span style={{ "color": "#FA383E" }}>Wow</span>} {colortxt === "5" && <span style={{ "color": "#F5C33B" }}>Buồn</span>} {colortxt === "6" && <span style={{ "color": "#f97355" }}>Phẫn nộ</span>}
                  {like}
                </div>

                <div className="box-list-icons">
                  <div className="icon-thich" onClick={LikePost} >
                    <label>Thích</label>
                  </div>
                  <div className="icon-yeuthich" onClick={FavoritePost}>
                    <label>Yêu Thích</label>
                  </div>
                  <div className="icon-haha" onClick={HahaPost}>
                    <label>Haha</label>
                  </div>
                  <div className="icon-wow" onClick={WowPost}>
                    <label>Wow</label>
                  </div>
                  <div className="icon-buon" onClick={SadPost}>
                    <label>Buồn</label>
                  </div>
                  <div className="icon-phanno" onClick={PhannoPost}>
                    <label>Phẫn nộ</label>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className='post_bottomOption'>
            <button onClick={handleOpen} style={{ "display": "flex", "alignItems": "center", "border": "none" }}><ChatBubbleOutlineIcon /><p>Bình luận{cmt}</p></button>
          </div>
          <div className='post_bottomOption'>
            <ShareIcon /><p>Chia sẻ {share}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post