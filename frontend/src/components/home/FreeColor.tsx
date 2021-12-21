function FreeColor(props) {
    return (
        <section className="sectionColor container">
            <img className="topImg" src={props.imgURL} alt="" />
            <div className="sectionBtmCont">
                <a className="btnImg" href={props.btnURL} ><img src={props.btnImgURL} alt="" /></a>
            </div>                      
        </section>
    )
}

export default FreeColor
