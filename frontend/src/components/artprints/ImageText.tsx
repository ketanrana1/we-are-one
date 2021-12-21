import React, { useState } from 'react'



export default function ImageText(props) {

    const {imgUrl, head, clickhandler } = props

    return (
        <div className="col-12 col-md-5 mb-5 p-md-0 each-image-cont">
            <img src={imgUrl} onMouseOver={clickhandler} data-toggle="modal" data-target="#artPrintsModal" />
            <h3>{head}</h3>            
        </div>
    )
}
    