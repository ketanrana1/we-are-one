import React from 'react'

const YouTubeEmbed = (props) => {
    return (
        <div className="py-4">
            <div className="video-container">
                    <iframe src={props.ytURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> 
                </iframe> 
            </div>                    
        </div>
    )
}

export default YouTubeEmbed
