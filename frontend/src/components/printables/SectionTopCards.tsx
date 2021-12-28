
import React from 'react'
import Card from './common/Card'

function SectionTopCards(props) {
    return (
        <section className="topCardsCont">
            <div className="container px-3 px-md-0 py-2">
                <div className="row justify-content-center">
                    {
                        props.loopData && props.loopData.map(item => {
                            return (
                                <div className="col-6 col-md-6 px-md-5 py-2 py-md-4">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    btnLink={item.btnLink}
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

export default SectionTopCards
