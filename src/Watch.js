import React, { Component } from 'react'
import SearchBar from './Searchbar';
import youtube from './apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './css/video.css';


export default class Watch extends Component {
  state = {
    videos: [],
    selectedVideo: null
}
handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get('/search', {
        params: {
            q: termFromSearchBar
        }
    })

    this.setState({
        videos: response.data.items
    })
    console.log("this is resp",response);
};
handleVideoSelect = (video) => {
    this.setState({selectedVideo: video})
}

render() {
    return (
      
        <div>       
        <div className="side-bar">
          <a href="#" className="links active"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/home.PNG?alt=media&token=07949447-474f-4db5-9ff1-1a5d706d2dac" alt="" />home</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/explore.PNG?alt=media&token=532170e3-cc34-4738-bd84-7450f05bcc0a" alt="" />explore</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/subscription.PNG?alt=media&token=81f2681b-42a2-49d1-93f4-65262d2c4681" alt="" />subscription</a>
          <hr className="seperator" />
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/library.PNG?alt=media&token=be60fc74-8db1-4062-8a8c-66d4a1e0bedd" alt="" />library</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/history.PNG?alt=media&token=77342884-7d9e-437c-8a17-5b25d58b7bbb" alt="" />history</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/your-video.PNG?alt=media&token=ba9ad92e-6bf3-4a0c-a54d-cfedc70ff85a" alt="" />your video</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/watch-later.PNG?alt=media&token=1ed38786-6669-40bf-96a1-fffb03c875ba" alt="" />watch leater</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/liked%20video.PNG?alt=media&token=2ae185ad-02f5-4deb-a1b9-1d182ef3a4d8" alt="" />like video</a>
          <a href="#" className="links"><img src="https://firebasestorage.googleapis.com/v0/b/no3demo.appspot.com/o/show%20more.PNG?alt=media&token=917c0171-cae1-4d36-9b06-1cb576dac526" alt="" />show more</a>
        </div>
        {/* filters */}
        <div className="filters">
        <div className="search-box1">
        <SearchBar handleFormSubmit={this.handleSubmit}/>
          </div>
          
        </div>
        
        {/* videos */}
        <div className="video-container">
          <div className="video">
        <VideoDetail video={this.state.selectedVideo}/>

        </div>
                  <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>

        </div>

      </div>
    )
}
}

