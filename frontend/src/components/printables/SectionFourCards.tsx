import React from 'react'
import Card from './common/Card'

function SectionFourCards(props) {

    let num = 1;

    return (
        <section className="secFourCards">
            <div className="container">
                <div className="row px-1 py-md-5">
                    {
                        props.loppData.map(item => {
                            return (
                                <div className={item.id === 11 ? "col-6 col-md-9 py-2 py-md-0" : "col-6 col-md-3 py-2 py-md-0"}>
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

export default SectionFourCards
