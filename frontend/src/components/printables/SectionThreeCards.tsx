import React from 'react'
import Card from './common/Card'

function SectionThreeCards(props) {
    return (
        <section className="secThreeCards">
            <div className="container">
                <div className="row px-1 py-5">
                    {
                        props.loopData.map(item => {
                            return(
                                <div className="col-6 col-md-3 px-3 px-md-4 py-2 py-md-4">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL} 
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

export default SectionThreeCards
