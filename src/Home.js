import React, {  useState } from 'react'
import RightSidebar from "./RightSidebar";
import SideBar from "./SideBar";
import Feed from "./Feed";
import Chatbox from './Chatbox';




function Home() {
    const [state, setState] =useState(false);
    const [current, setCurrent] = useState({});

    const closeChat = () => {
        setState(false);
      };
      const openChat = (user) => {
        setState(true);
        setCurrent(user);
        console.log(current);
      };
    return (
        <>
            <SideBar />
            <Feed />
            <RightSidebar openChat={openChat} />
            <div className="chatbox">
              <Chatbox state={state} current={current} closeChat={closeChat}/>
            </div>
        </>

    )
}

export default Home