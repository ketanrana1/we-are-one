import React from 'react'
import Card from './common/Card'

function SectionTwoCards(props) {
    return (
        <section className="secTwoCards">
            <div className="container">
                <div className="row px-1 py-md-5">
                    {
                        props.loopDataTwo && props.loopDataTwo.map(item => {
                            return (
                                <div className="col-6 col-md-3 px-md-4 py-2 py-md-4 justify-content-center">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    />
                                </div>
                            );
                        })
                    }
                    <div className="col-12 pt-5">
                        <Card cardImgURL="/assets/images/printable-sec-2-img-1.png" />
                    </div>                
                </div>
            </div>
        </section>
    )
}

export default SectionTwoCards
