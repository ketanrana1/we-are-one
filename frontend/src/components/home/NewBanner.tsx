import React from 'react'

const NewBanner = (props) => {
    return (
        <div>
            <section className="section-new-banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <div className="banner-container">
                            <img src={props.imgURL} alt="" />
                            <h2>{props.bannerText}</h2>
                        </div>                       
                    </div>
                </div>
            </div>
        </section>            
        </div>
    )
}

export default NewBanner
