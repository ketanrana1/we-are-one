import React, { useState, useEffect } from 'react'
import ImageWithButton from './common/ImageWithButton'
import axios from 'axios';
import getConfig from 'next/config'
import AllBooks from 'components/books/AllBooks';
const { publicRuntimeConfig } = getConfig()

export default function ChildBooks(props) {
    const [respone, setrespone] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/allBooks`); 
        setrespone(data.response)
    }

    useEffect(() => {
        API();
    },[]);

    return (
        <div className="sec-childs-bookshelf container">
            <h2>{props.topHead}</h2>
            <div className="row">
            {
                respone?.map( (data:any, index) => {                       
                        return (
                            <div className="col-12 col-md-4">
                                <ImageWithButton imgUrl={data.book_image_name} btnLnkUrl={publicRuntimeConfig.frontendBaseUrl + "product/" + data.slug} />
                            </div>
                        );
                    })
            } 
            </div>
            <div className="btmCont">
                <img src="/assets/images/heart.png/" />
            <p>{props.btmHead}</p>           
            </div>       
            
        </div>
    )
}
