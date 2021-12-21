import TextCard from './common/TextCard';
import ImageCard from './common/ImageCard';

function WeAreOne(props) {

    return (
        <section className="sectionTwoMain">
            <div className="sectionTopCont">
                <img src="/assets/images/award-winning-bg-1.png" />
            </div>
            <div className="container">                                                                                        
                <div className="sectionBtmCont">
                    <div className="row">
                        <ImageCard
                            topImgURL="/assets/images/award-winning-book-bg-1.png"
                            topLink="http://www.worldofweareone.com/Books?product_id=50"
                            topLnkImgURL="/assets/images/heart.png"
                            head="We Are One"
                            spanHd="(Hardcover)"
                            btnLnkURL="http://www.worldofweareone.com/Books?product_id=50"
                            btnImgURL="/assets/images/buy-now-btn.png"                      
                        />
                        <TextCard 
                            imgURL="/assets/images/award-winning-book-bg-2.png"
                            btnURL="http://www.worldofweareone.com/Books"
                            btnImgURL="/assets/images/shop-now-btn.png" 
                            paraLoop={props.loopData}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeAreOne
