import React from 'react'

export default function Banner(props) {
    return (
        <div className="art-prints-banner">
            <img src={props.imgUrl} />
            <h2>{props.head}</h2>           
        </div>
    )
}
