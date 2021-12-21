import React from 'react'
import ImageWithButton from 'components/common/ImageWithButton'

export default function AllBooks(props) {
    return (
        <section className="sec-all-books-page">
            <img className="top-image" src={props.topImg} />
            <div className="sec-childs-bookshelf book-page-images container">
                
                <h3>{props.topHead}</h3>
                <p className="descp">{props.descp}</p>
                <div className="row">
                    <div className="col-12 col-md-4">
                    <ImageWithButton imgUrl={props.firstImgUrl} btnLnkUrl={props.firstBtnLnkUrl} />
                    </div>
                    <div className="col-12 col-md-4">
                    <ImageWithButton imgUrl={props.secondImgUrl} btnLnkUrl={props.secondBtnLnkUrl} />
                    </div>
                    <div className="col-12 col-md-4">
                    <ImageWithButton imgUrl={props.thirdImgUrl} btnLnkUrl={props.thirdBtnLnkUrl} />
                    </div>
                </div>           
            </div>
        </section>
    )
}
