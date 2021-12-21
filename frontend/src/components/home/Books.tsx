import React from 'react'

export default function books(props) {
    return (
        <div className="section-books txt-on-img-cont container">
                <img src={props.imgUrl} />
                <div className="text-cont">
                    <h2>{props.heading}</h2>
                    <a href={props.btnUrl} className="button-common">{props.btnText}</a>
                </div>       
        </div>
    )
}
