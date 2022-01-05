import React from 'react';
import TextLine from './TextLine';

function TextCard(props) {
    return (
        <div className="col-md-6 p-0">
            <div className="contRight">
                <img className="topImg" src={props.imgURL} alt="" />
                <div className="overlayCont">
                    {props.paraLoop && props.paraLoop.map(item => {
                        return (
                            <TextLine 
                            key={item.id} 
                            paraText={item.name} 
                            />
                        ); 
                    })}
                    <a href={props.btnLnkURL} className="button-common">
                        SHOP NOW
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TextCard
