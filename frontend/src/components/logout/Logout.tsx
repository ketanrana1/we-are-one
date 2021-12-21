import React from 'react'

const Logout = () => {
    return (
        <div className="logout-page py-5">
            <div id="content" className="container remove-gradient-bg">  
                <div className="breadcrumb wao-breadcrumb px-0 pb-0">
                    <a href="">Home</a>
                    » <a href="">Account</a>
                    » <a href="">Logout</a>
                </div>
                <h1>Account Logout</h1>
                <p>You have been logged off your account. It is now safe to leave the computer.</p><p>Your shopping cart has been saved, the items inside it will be restored whenever you log back into your account.</p>
                <div className="buttons">
                    <div className="right">
                        <a href="" className="btn-btm">Continue</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout
