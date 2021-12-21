import React from 'react'

export default function AppImage(props) {
    return (
        <div className="sec-app-image container">
            <a href={props.imgLink}>
                <div className="app-image-hover">
                    <figure>
                        <img src={props.imgUrl} />  
                    </figure>
                </div>                
            </a>            
        </div>
    )
}
