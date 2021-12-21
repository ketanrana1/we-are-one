import React from 'react'

export default function ProductNewImage(props) {   
    return (
        <>
            {props.allImagesData.map(item => {
                return (
                    <div className="each-image pr-md-3">
                        <img key={item.id} className="each-product-image" src={item.url} />
                    </div>
                );
            })}
        </>     
    )
}
