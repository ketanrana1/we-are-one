import React from 'react'

export default function ArtPrints(props) {
    return (
        <div className="section-art-prints txt-on-img-cont container">
            <img src={props.imgUrl} />
                <div className="text-cont">
                    <h2>{props.heading}</h2>
                    <a href={props.btnUrl} className="button-common">{props.btnText}</a>
                </div>         
        </div>
    )
}
