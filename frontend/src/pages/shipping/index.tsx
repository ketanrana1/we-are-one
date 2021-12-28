import React, { useState, useEffect } from 'react'
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


import LayoutNew from 'components/common/LayoutNew'

export default function Shipping() {

  const [response, setrespone] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/pagecontent/shipping/`); 
        setrespone(data.response);

    }

    useEffect(() => {   
        API(); 
    },[]);


    return (
        <div className="container p-md-5">
        <h1>Shipping</h1>
        <div className="">
        {
                    response?.map( (data:any, index) => {                       
                            return (
                                <div className="">
                                    {data.content}
                                </div>
                            );
                        })
                    }
        </div>

        </div>
        
    )
}

Shipping.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }   
