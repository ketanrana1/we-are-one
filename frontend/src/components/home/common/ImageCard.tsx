import React from 'react'


function ImageCard(props) {
    return (
        <div className="col-md-6 p-0">
            <div className="topImgCont">
                <img className="mainImg" src={props.topImgURL} alt="" />                
                <div className="bottomLeftOverlayCont">
                    <a href={props.topLink}>
                        <img className="heartImg" src={props.topLnkImgURL} alt="" />
                    </a>
                    <h3>
                    {props.head} <br />
                        <span>{props.spanHd}</span>
                    </h3>
                    {/* <a href={props.btnLnkURL} className="btnImgLnk">
                        <img src={props.btnImgURL} alt="" />
                    </a> */}
                    <a href={props.btnLnkURL} className="button-common">
                        BUY NOW
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
