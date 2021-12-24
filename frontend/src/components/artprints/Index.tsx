import React, {useState, useEffect} from 'react'
import Banner from 'components/artprints/Banner'
import ImageText from './ImageText'
import ModalImage from './ModalImage'
import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function Index() {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    const [respone, setrespone] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/artprints/allArtprints`); 
        setrespone(data.response)
    }

    useEffect(() => {   
        API(); 
    },[]);
    
    return (
        <div className="art-prints-cont">
            <Banner 
                imgUrl="/assets/images/Art Print Web Page Banner.png" 
                head={["Art to delite, nourish ", <br/>,  "and inspire us all!"]}
            />
            <div className="textbox-cont container">
                <h3>“Surround every child in an environment reflecting peace & harmony.”</h3>
                <p className="para">I love creating images that cultivate loving kindness towards ourselves, each other, all beings and planet Earth. Welcome to the gallery. <br/>Blessings, Jennifer </p>
            </div>
            <div className="images-text-cont container">
                <div className="row justify-content-evenly">

                {
                    respone?.map( (data:any, index) => { 
                        
                        let artprintLink = `/product/artprints/${data.slug}`
                            return (
                                <ImageText 
                                    key={data.artId}
                                    imgUrl={data.art_image_1_name}
                                    head={data.art_name}
                                    clickhandler = {()=> {
                                        setimageChanger(data.art_image_1_name)
                                        setimageLink(artprintLink)
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
            {imageChanger && imageLink && 
                <ModalImage 
                imgLink={imageLink}
                imgUrl={imageChanger}
                />
            }
        </div>
    )
}
