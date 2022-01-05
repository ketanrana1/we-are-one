import React from 'react'

function Card(props) {
    return (
        <div className="cardCont">
            <img className="cardImg" src={props.cardImgURL} />
            <div className="btmCont">
                <button type="button" className="btmButton">
                    <a href ={props.btnLink} target="_blank">Download </a>
                </button>
            </div>   
        </div>
    )
}

export default Card
