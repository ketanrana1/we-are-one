import React from 'react'
import ImageBanner from 'components/common/ImageBanner'
import Award from './Award'


const Index = () => {

    const awardData = [
        {
            id: 95871,
            imgURL: "/assets/images/award-we-are-one.png",
            title: "We Are One",
            author: "by Jennifer Black"
        },
        {
            id: 95872,
            imgURL: "/assets/images/award-we-are-one.png",
            title: "We Are Love",
            author: "by Jennifer Black"
        },
        {
            id: 95873,
            imgURL: "/assets/images/award-we-are-one.png",
            title: "We Are One Exploration Cards",
            author: "by Jennifer Black"
        },
        {
            id: 95874,
            imgURL: "/assets/images/award-we-are-excellence.png",
            title: "We Are Love",
            author: "by Jennifer Black"
        },
        {
            id: 95875,
            imgURL: "/assets/images/award-we-are-one-preferred-choice.png",
            title: "We Are One Exploration Cards",
            author: "by Jennifer Black"
        }
    ]

    return (
        <div className="awards-page">
            <ImageBanner imgURL="/assets/images/Awards%20Banner-min.jpg" />
            <p className="para-blw-bnr">I am honored and grateful to receive these awards! <br/> Moms know whats BEST for their children!</p>
            <div className="container">
                <div className="row justify-content-center">
                    {
                        awardData.map( item => {
                            return (
                                <Award 
                                key={item.id}
                                imgURL={item.imgURL}
                                title={item.title}
                                author={item.author}
                                />
                            );

                        })
                    } 
                </div>
            </div>                     
        </div>
    )
}

export default Index
