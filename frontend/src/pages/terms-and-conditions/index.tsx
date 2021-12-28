import React, { useState, useEffect } from 'react'
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

import LayoutNew from 'components/common/LayoutNew'

export default function TermsAndConditions() {

  const [response, setrespone] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/pagecontent/termsAndConditions/`); 
        setrespone(data.response);

    }

    useEffect(() => {   
        API(); 
    },[]);


    return (
        <div className="container p-md-5">
        <h1>Terms and Conditions</h1>
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

TermsAndConditions.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }   
