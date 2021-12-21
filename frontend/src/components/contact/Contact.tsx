import React from 'react'
import ImageBanner from 'components/common/ImageBanner'

const Contact = () => {
    return (
        <div className="contact-page">
            <ImageBanner imgURL="/assets/images/contact-us-banner.png" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-8">
                        <form className="contact-us-form-wrapper" action="" method="post" encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="title">Contact Form</h2>
                                </div>
                                <div className="col-md-6">
                                    <div className="common-input-field-wrapper">
                                        <label>First Name:</label>
                                        <input type="text" name="name" value="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="common-input-field-wrapper">
                                        <label>E-Mail Address:</label>
                                        <input type="text" name="email" value="" />
                                    </div>
                                </div>
                                <div className="col-md-12 py-3">
                                    <div className="common-input-field-wrapper">
                                        <label>Enquiry:</label>
                                        <textarea name="enquiry" cols={40} rows={4} style={{width: "99%"}}></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="common-input-field-wrapper input-field-captcha">
                                        <label>Enter the code in the box below:</label>
                                        <div className="inline-capture">
                                            <input type="text" name="captcha" value="" />
                                            <img style={{verticalAlign: "bottom"}} src="/assets/images/index.jpeg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 pt-4">
                                    <div className="submit-input-field-wrapper">
                                        <div className="right">
                                            <input type="submit" value="Continue" className="button" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
