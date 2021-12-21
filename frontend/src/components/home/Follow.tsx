import SocialIcon from './common/SocialIcon';

function Follow(props) {


    return (
        <section className="sectionFollow container">
            <img className="topImg" src={props.imgURL} alt="" />

            <div className="sectionBtmCont">
                <h4>{props.title}</h4>
                <ul className="folllow-icons">                   
                    {props.socialData.map(item => {
                            return (
                                <SocialIcon 
                                key={item.id}
                                socilaLink={item.socialLink}
                                socialImage={item.imageLink} 
                                /> 
                            );
                        })}               
                </ul>  
            </div>                   
        </section>
    )
}

export default Follow
