import React from 'react'

export default function TextWithVideo(props) {
    return (
        <section className="sec-text-with-video">
            <img className="top-image" src={props.topImg} />
            <div className="bottom-cont container">
                <div className="text-cont">
                    <h2>{props.head}</h2>
                    <p>{props.descp}</p>
                </div>
                <div className="video-cont row d-flex justify-content-center mb-5">
                    <div className="col-12 col-md-7">
                        <video id="audioplayer" width="100%" height="100%"  controls autoPlay loop muted>
                            <source src={props.videoUrl} type="video/mp4" />
                            <source src={props.videoUrl} type="video/ogg" />
                        </video>
                    </div>
                </div>               
            </div>         
        </section>
    )
}
