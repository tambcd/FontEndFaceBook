import React from "react";

const VideoDetail = ({ video }) => {
  
  if (!video) {
    
    return <div>
       
       <iframe width="560" height="315" src="https://www.youtube.com/embed/uGCtrg9DMa4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       
       <br></br>
      
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(video);
  return (
    <div>
      <div className="ui embed">
        <iframe width="560" height="300"  src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
