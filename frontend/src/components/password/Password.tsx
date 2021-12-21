import React from 'react'

const Password = () => {
    return (
        <div className="password-rest-page py-5 container">
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                    <div className="common-account-form-wrapper-main">
                        <h2 className="sec-title">Forgot Your Password?</h2>
                        <p className="description">Enter the e-mail address associated with your account. Click submit to have your password e-mailed to you.</p>
                    </div>
                    </div>
                    <form action="" method="post" encType="multipart/form-data">
                    <div className="col-12">
                        <div className="common-input-field-wrapper">
                        <label>E-Mail Address:</label>
                        <input type="text" name="email" value="" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="submit-input-field-wrapper">
                        </div>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-12 px-0">
                        <div className="submit-input-field-wrapper">
                            <input type="submit" value="Continue" className="button" />
                            <a href="" className="btn-btm">Back</a>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-2">
                </div>

            </div>
                <div className="col-md-3">
                </div>

            </div>
        </div>
    )
}

export default Password
