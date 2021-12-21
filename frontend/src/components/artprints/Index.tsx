import React, {useState} from 'react'
import Banner from 'components/artprints/Banner'
import ImageText from './ImageText'
import ModalImage from './ModalImage'

const artPrintsData = [
    { id: "369851", imgUrl: "/assets/images/artPrints/we-are-all-in-this-together/We are all in this together 1.jpg", head: "‘We are all in this together’", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369852", imgUrl: "/assets/images/artPrints/rainbow-magic/Rainbow Magic 1.jpg", head: "Rainbow Magic", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369853", imgUrl: "/assets/images/artPrints/planet-mandala/Planet Mandala 1.jpg", head: "Planet Mandala", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369854", imgUrl: "/assets/images/artPrints/heart-mandala/Heart Mandala 1.jpg", head: "Heart Mandala", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369855", imgUrl: "/assets/images/artPrints/abundant-eart-bundle/Abundant Earth Bundle 1.jpg", head: "Abundant Earth Bundle", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369856", imgUrl: "/assets/images/artPrints/oceans-treasure/Ocean's Treasure 1.jpg", head: "Ocean’s Treasure", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369857", imgUrl: "/assets/images/artPrints/the-places-we-go/The places we go 1.jpg", head: "The places we go...", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369858", imgUrl: "/assets/images/artPrints/music-for-all/Music for all 1.jpg", head: "Music for all...", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "369859", imgUrl: "/assets/images/artPrints/fairy-place/Fairy Place 1.jpg", head: "Fairy Place", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698510", imgUrl: "/assets/images/artPrints/abundant-earth/Abundant Earth 1.jpg", head: "Abundant Earth", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698511", imgUrl: "/assets/images/artPrints/animal-tribe/Animal Tribe 1.jpg", head: "Animal Tribe", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698512", imgUrl: "/assets/images/artPrints/nature-gift/Nature's Gift 1.jpg", head: "Nature’s Gift", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698513", imgUrl: "/assets/images/artPrints/circleof-children/Circle of Children 1.jpg", head: "Circle of Children", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698514", imgUrl: "/assets/images/artPrints/respect/Respect 1.jpg", head: "Respect", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698515", imgUrl: "/assets/images/artPrints/sun-mandala/Sun Mandala 1.jpg", head: "Sun Mandala", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698516", imgUrl: "/assets/images/artPrints/mandala-bundle/Mandala Bundle 1.jpg", head: "Mandala Bundle", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698517", imgUrl: "/assets/images/artPrints/sun-&-Moon/Sun & Moon 1.jpg", head: "Sun & Moon", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698518", imgUrl: "/assets/images/artPrints/in-this-together-bundle/In this together 1.jpg", head: "In this together Bundle", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698519", imgUrl: "/assets/images/artPrints/infinity/Infinity 1.jpg", head: "Infinity", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
    { id: "3698520", imgUrl: "/assets/images/artPrints/moon-lighting/Moonlighting 1.jpg", head: "Moonlighting", imgLink: "http://localhost:3000/product/abundant-eart-bundle" },
]

export default function Index() {
    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")
    
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
                        artPrintsData.map((item,index) => {
                            return (
                                <ImageText 
                                    key={item.id}
                                    imgUrl={item.imgUrl}
                                    head={item.head}
                                    clickhandler = {()=> {
                                        setimageChanger(item.imgUrl)
                                        setimageLink(item.imgLink)
                                    }}
                                />
                            )
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
