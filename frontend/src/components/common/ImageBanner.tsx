import React from 'react'

const ImageBanner = (props) => {
    return (
        <section className="imageBanner">
            <img src={props.imgURL} />
        </section>
    )
}
 
export default ImageBanner
