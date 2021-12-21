import React from 'react'

export default function ImageWithButton(props) {
    return (
        <div className="image-with-button">
            <img className="book-img" src={props.imgUrl} />
            <div className="btn-cont">
                <img src="/assets/images/heart.png" />
                <a href={props.btnLnkUrl} className="button-common-new">
                    BUY NOW
                </a>
            </div> 
        </div>


    )
}
