import React from 'react'
import ImageWithButton from './common/ImageWithButton'

export default function ChildBooks(props) {
    return (
        <div className="sec-childs-bookshelf container">
            <h2>{props.topHead}</h2>
            <div className="row">
                <div className="col-12 col-md-4">
                <ImageWithButton imgUrl={props.firstImgUrl} btnLnkUrl={props.firstBtnLnkUrl} />
                </div>
                <div className="col-12 col-md-4">
                <ImageWithButton imgUrl={props.secondImgUrl} btnLnkUrl={props.secondBtnLnkUrl} />
                </div>
                <div className="col-12 col-md-4">
                <ImageWithButton imgUrl={props.thirdImgUrl} btnLnkUrl={props.thirdBtnLnkUrl} />
                </div>
            </div>
            <div className="btmCont">
                <img src="/assets/images/heart.png/" />
            <p>{props.btmHead}</p>           
            </div>       
            
        </div>
    )
}
