import TextCard from './common/TextCard';

function DownloadAppVideo(props) {

    return (
        <section className="sectionCardVideo">
            <div className="container">
                <div className="sectionBtmCont">
                    <div className="row">
                        <div className="col-md-6 p-0">
                            <video id="audioplayer" width="100%" height="100%"  controls autoPlay loop muted>
                                <source src="/assets/videos/app-add.mp4" type="video/mp4" />
                                <source src="/assetscatalog/view/theme/default/videos/app-add.ogg" type="video/ogg" />
                            </video>                      
                        </div>
                        <TextCard 
                            imgURL="/assets/images/award-winning-book-bg-6.png"
                            paraLoop={props.loopData}
                        />                        
                    </div>
            </div>
            </div>
        </section>
    )
}

export default DownloadAppVideo
