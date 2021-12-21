import React from 'react'
import Banner from './Banner'
import SectionTopCards from './SectionTopCards'
import SectionTwoCards from './SectionTwoCards'
import SectionThreeCards from './SectionThreeCards'
import SectionFourCards from './SectionFourCards'
import SectionFiveCards from './SectionFiveCards';

function Index() {

    const topCardsData = [
        {
            id: 1,
            cardImgURL: "/assets/images/printable-sec-1-img-1.png"
        },
        {
            id: 2,
            cardImgURL: "/assets/images/printable-sec-1-img-2.png"
        },
        {
            id: 3,
            cardImgURL: "/assets/images/printable-sec-1-img-3.png"
        },
        {
            id: 4,
            cardImgURL: "/assets/images/printable-sec-1-img-4.png"
        },
        {
            id: 5,
            cardImgURL: "/assets/images/printable-sec-1-img-5.png"
        }
    ]

    const secTwoCards = [
        {
            id: 10,
            cardImgURL: "/assets/images/printable-sec-6-img-1.png"
        },
        {
            id: 20,
            cardImgURL: "/assets/images/printable-sec-6-img-2.png"
        },
        {
            id: 30,
            cardImgURL: "/assets/images/printable-sec-6-img-3.png"
        },
        {
            id: 40,
            cardImgURL: "/assets/images/printable-sec-6-img-4.png"
        }
    ]

    const secThreeCards = [
        {
            id: 100,
            cardImgURL: "/assets/images/printable-sec-3-img-1.png"
        },
        {
            id: 200,
            cardImgURL: "/assets/images/printable-sec-3-img-2.png"
        },
        {
            id: 300,
            cardImgURL: "/assets/images/printable-sec-3-img-3.png"
        },
        {
            id: 400,
            cardImgURL: "/assets/images/printable-sec-3-img-4.png"
        },
        {
            id: 500,
            cardImgURL: "/assets/images/printable-sec-3-img-5.png"
        },
        {
            id: 600,
            cardImgURL: "/assets/images/printable-sec-3-img-6.png"
        },
        {
            id: 700,
            cardImgURL: "/assets/images/printable-sec-3-img-7.png"
        },
        {
            id: 800,
            cardImgURL: "/assets/images/printable-sec-3-img-8.png"
        },
        {
            id: 900,
            cardImgURL: "/assets/images/printable-sec-3-img-9.png"
        },
        {
            id: 100,
            cardImgURL: "/assets/images/printable-sec-3-img-10.png"
        },
        {
            id: 1100,
            cardImgURL: "/assets/images/printable-sec-3-img-11.png"
        },
        {
            id: 1200,
            cardImgURL: "/assets/images/printable-sec-3-img-12.png"
        }
    ]

    const secFourCards = [
        {
            id: 11,
            cardImgURL: "/assets/images/printable-sec-4-img-1.png"
        },
        {
            id: 22,
            cardImgURL: "/assets/images/printable-sec-4-img-2.png"
        }
    ]

    const secFiveCards = [
        {
            id: 111,
            cardImgURL: "/assets/images/printable-sec-5-img-2.png"
        },
        {
            id: 222,
            cardImgURL: "/assets/images/printable-sec-5-img-4.png"
        },
        {
            id: 333,
            cardImgURL: "/assets/images/printable-sec-5-img-3.png"
        },
        {
            id: 444,
            cardImgURL: "/assets/images/Screen-Saver-min.jpg"
        }
    ]


    return (
        <div>
            <Banner 
            topImgURL="/assets/images/printables-banner.png"
            btmImgURL="assets/images/coloring-bg.png"
            />
            <SectionTopCards 
            loopData={topCardsData}
            />
            <SectionTwoCards 
            loopDataTwo={secTwoCards}
            />
            <SectionThreeCards 
            loopData={secThreeCards}
            />
            <SectionFourCards 
            loppData={secFourCards}
            />
            <SectionFiveCards
            loopData={secFiveCards} 
            />
        </div>
    )
}

export default Index
