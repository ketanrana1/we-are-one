function Video(props) {
    return (
        <section className="sectionVideo">           
                <a className="btnImg" href={props.btnURL} target="_blank">
                    <img src={props.btnImgURL} alt=""  />
                </a>                     
        </section>
    )
}

export default Video