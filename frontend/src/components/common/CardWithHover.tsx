import React from 'react'

const CardWithHover = (props) => {
    return (
        <div className="cmmn-crd-wth-hvr">
            <div className="topImgCont">
                <img className="mainImg" src={props.topImgURL} alt="" />                
                <div className="bottomLeftOverlayCont">
                    <a href={props.btnLinkURL}>
                        <img className="heartImg" src="/assets/images/heart.png" alt="" />
                    </a>
                    <h3>
                    {props.head} <br />
                        <span>{props.spanHd}</span>
                    </h3>
                    <a href={props.btnLinkURL} className="btnImgLnk">
                        <img src={props.btnImgURL} alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardWithHover