import React from 'react'

export default function RainbowText(props) {
    return (
        <section className="sectionTwoMain rain-bow-sec">
            <div className="sectionTopCont">
                <img src={props.imgUrl} />
                <p className="container"><span>Hello & Welcome!</span>  My name is Jennifer and I am dedicated to
                creating conscious content for children, young & old, around the 
                world! Here you will find books, art prints, free colouring in
                pages, the upcoming We Are One App & shows. <br/>
                I hope to bring you and your loved ones lots of joy!
                With blessing, Jennifer</p>
            </div>
        </section>
    )
}
