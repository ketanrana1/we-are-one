import React from 'react'

export default function VideoSec(props) {
    return (
        <div className="sec-video-new container">
            <video id="audioplayer" width="100%" height="100%"  controls autoPlay loop muted>
                <source src={props.videoUrl} type="video/mp4" />
                <source src={props.videoUrl} type="video/ogg" />
            </video>             
        </div>
    )
}
