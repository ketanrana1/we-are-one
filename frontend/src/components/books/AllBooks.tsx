import React, { useState, useEffect } from 'react'
import ImageWithButton from 'components/common/ImageWithButton'
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


export default function AllBooks(props) {

    const [respone, setrespone] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/allBooks`); 
        setrespone(data.response)
    }

    useEffect(() => {   
        API(); 
    },[]);

    return (
        <section className="sec-all-books-page">
            <img className="top-image" src={props.topImg} />
            <div className="sec-childs-bookshelf book-page-images container">                
                <h3>{props.topHead}</h3>
                <p className="descp">{props.descp}</p>
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
            </div>
        </section>
    )
}
