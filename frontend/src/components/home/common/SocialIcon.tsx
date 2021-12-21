import React from 'react'

function SocialIcon(props) {
    return (
        <li>
            <a href={props.socilaLink} target="_blank"><img src={props.socialImage} alt="" />
            </a>
        </li>
    )
}

export default SocialIcon
