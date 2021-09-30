import React from 'react';
import YouTube from 'react-youtube';

export default function TrailerVideo(props) {

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    }
  }

  const videoOnReady = (event) => {
    event.target.pauseVideo();
  }

  return (
    <YouTube videoId={props.videoId} opts={opts} onReady={videoOnReady} />
  )
}