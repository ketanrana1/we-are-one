import React from 'react'
import Card from './common/Card'

function SectionFiveCards(props) {
    return (
        <section className="secFiveCards">
            <div className="container">
                <div className="row d-flex px-1 py-5 py-md-5">
                    <div className="col-4 py-md-4 py-md-0 top-cont">
                        <Card cardImgURL="/assets/images/printable-sec-5-img-1.png" btnLink="/assets/images/printable-sec-5-img-1.png" />
                    </div>
                    <div className="col-4">
                        <div className="row d-flex new-bottm-cont">
                            <div className="col-12 px-md-5 py-md-4 py-md-0">
                                <Card 
                                key={props.loopData[0].id}
                                cardImgURL={props.loopData[0].cardImgURL}
                                btnLink={props.loopData[0].btnLink}
                                />
                            </div>
                            <div className="col-12 px-md-5 py-md-4 py-md-0">
                                <Card 
                                key={props.loopData[1].id}
                                cardImgURL={props.loopData[1].cardImgURL}
                                btnLink={props.loopData[1].btnLink}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 ">
                        <div className="row d-flex new-bottm-cont">
                            <div className="col-12 px-md-5 py-md-4 py-md-0">
                                <Card 
                                    key={props.loopData[2].id}
                                    cardImgURL={props.loopData[2].cardImgURL}
                                    btnLink={props.loopData[2].btnLink}
                                />
                            </div>
                            <div className="col-12 px-md-5 py-md-4 py-md-0 last-img-cont">
                                <Card 
                                key={props.loopData[3].id}
                                cardImgURL={props.loopData[3].cardImgURL}
                                btnLink={props.loopData[3].btnLink}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionFiveCards
