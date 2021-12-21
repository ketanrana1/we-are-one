
function Banner(props) {
    return (
        <section className="sectionBanner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <img src={props.imgURL} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;