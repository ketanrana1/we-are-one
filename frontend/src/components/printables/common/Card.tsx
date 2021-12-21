import React from 'react'

function Card(props) {
    return (
        <div className="cardCont">
            <img className="cardImg" src={props.cardImgURL} />
            <div className="btmCont">
                <button type="button" className="btmButton" data-toggle="modal" data-target="#exampleModal">
                    Download
                </button>
            </div>   
        </div>
    )
}

export default Card
