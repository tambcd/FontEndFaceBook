import React, { useEffect, useState }  from 'react'
import './css/OneStory.css';
import OneStory from './OneStory'
import { useStateValue } from './StateProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './firebase';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function Story() {
  const [{user},dispatch] = useStateValue();
  const [image, setImg] = useState("");
  const [Story, setstory] = useState([]);

  useEffect(() => {

    const q = query(collection(db, "storys"), orderBy("time", "asc"));  
    onSnapshot(q,
      (snapshot) => {
        setstory(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
  }, [])

  const uploadfile = () => {
    document.getElementById("imageFile").click();

  }
  
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
                addDoc(collection(db, "storys"), {
                  avatar: localStorage.getItem("photoURL"),
                  time: serverTimestamp(),
                  imgstr: url,
                  name : localStorage.getItem("displayName")
                });
                
                setImg("");
                toast.success("đã cập nhập story!!!")
  
              })
          }
  
        )
  
      
    }      

  }
  return (
    <div className='storys'>
      <ToastContainer style={{ "marginTop": "100px" }} />
      <div className='story' style={{ backgroundImage: `url(${user.photoURL.replace("zzz", "&").replace("iii", "%")})` ,"cursor":"pointer" }} onClick={uploadfile}  >   

      <input type="file" id='imageFile' accept="image/*" style={{ display: "none" }} onChange={handlechange} />
   
          <AddCircleIcon  />
          <h4>{user.displayName} </h4>
        
      </div>
      <div className='liststory'>
      {
          Story.map(story=>{
           return   <OneStory title={story.data.name} srcAvatar={story.data.avatar} 
           srcStory={story.data.imgstr} />
          })
        }      
    
      </div>

    </div>
  )
}

export default Story