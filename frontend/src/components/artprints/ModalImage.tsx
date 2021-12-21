import React from 'react'

export default function ModalImage(props) {
    return (
        <>
            <div className="modal fade" id="artPrintsModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body art-prints-modal">
                            <a href={props.imgLink}>
                                <img src={props.imgUrl} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
