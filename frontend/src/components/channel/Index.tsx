import React from 'react'
import ImageBanner from 'components/common/ImageBanner'
import YouTubeEmbed from './YouTubeEmbed'

const Index = () => {
    return (
        <div className="channelPage">
            <ImageBanner imgURL="/assets/images/youtube-banner.png" />
            <div className="container">
                <p className="channelPara">
                We are busy filming for the World of We Are One’s ‘Exploring our World’ series! A fun filled show about cultivating loving kindness towards ourselves, planet earth and all it’s inhabitants. In the meantime, we would love it if you subscribed to our You tube channel , then you will be notified when we launch!
                </p>
                <YouTubeEmbed ytURL="https://www.youtube.com/embed/8igOteyvW_4" />
                <YouTubeEmbed ytURL="https://www.youtube.com/embed/JRrcY8h7EYw" />
            </div>
        </div>
        
    )
}

export default Index
