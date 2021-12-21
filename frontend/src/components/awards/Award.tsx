import React from 'react'

const Award = (props) => {
    return (
        <div className="col-6 col-md-4 py-3 py-md-5 award-col">
            <img src={props.imgURL} className="awardImage" />
            <h2>{props.title}</h2>
            <h3>{props.author}</h3>            
        </div>
    )
}

export default Award
