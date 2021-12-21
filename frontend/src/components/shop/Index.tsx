import React from 'react'
import ImageBanner from 'components/common/ImageBanner'
import CardWithHover from 'components/common/CardWithHover'

const Index = () => {

    const cardData = [

        {
            id: 77771,
            heading: "We Are One book",
            subheading:"(Hardcover)",
            imgURL: "/assets/images/we-are-one-book-new-800x1020.png", 
            btnImgUrl: "/assets/images/buy-now-btn.png",
            btnLinkUrl: "/product/we-are-one/"
        },
        {
            id: 77772,
            heading: "We Are Love",
            subheading:"(Hardcover)",
            imgURL: "/assets/images/we-are-love-book-800x1020.png", 
            btnImgUrl: "/assets/images/buy-now-btn.png",
            btnLinkUrl: "http://www.worldofweareone.com/Books?product_id=51"
        },
        {
            id: 77773,
            heading: "",
            subheading:"",
            imgURL: "/assets/images/phone-app.png",
            btnImgUrl: "",
            btnLinkUrl: "" 
        },
        {
            id: 77774,
            heading: "We Are One book",
            subheading:"(Hardcover)",
            imgURL: "/assets/images/2+-books-FREE-min.jpg", 
            btnImgUrl: "/assets/images/buy-now-btn.png",
            btnLinkUrl: "http://www.worldofweareone.com/2-books-with-free-shipping"
        }
    ]

    return (
        <section className="shop-Page">
            <ImageBanner imgURL="/assets/images/shop-banner.png" />
            <img src="/assets/images/award-winning-bg-1.png" className="fl-wdth-img" />
            <div className="container">
                <div className="row">
                    {
                        cardData.map(item => {
                            return (
                                <div className = {item.id === 77773 ? "col-12 col-md-6 py-md-5 py-3 no-btn" : "col-12 col-md-6 py-md-5 py-3"}>
                                    <CardWithHover
                                    key={item.id}
                                    topImgURL={item.imgURL}
                                    head={item.heading}
                                    spanHd={item.subheading}
                                    btnLinkURL={item.btnLinkUrl}
                                    btnImgURL={item.btnImgUrl}
                                    />
                                </div>
                            );
                        })
                    }                   
                </div>
            </div>
        </section>
    )
}

export default Index
