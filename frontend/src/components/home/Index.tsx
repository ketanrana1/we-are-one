import React from 'react'
import Banner from './Banner';
import WeAreOne from './WeAreOne'
import WeAreLove from './WeAreLove';
import DownloadAppVideo from './DownloadAppVideo';
import FreeColor from './FreeColor';
import Video from './Video';
import Follow from './Follow';
import NewBanner from './NewBanner';
import RainbowText from './RainbowText';
import Books from './Books';
import ArtPrints from './ArtPrints';
import ChildBooks from './ChildBooks';
import VideoSec from './VideoSec';
import AppImage from './AppImage';
import LayoutNew from 'components/common/LayoutNew';



export default function Index() {


    const weAreOneData = [                
        {id: 1465, name: "‘The light that shines with our hearts"},
        {id: 22458, name: "is the love that makes us care,"},
        {id: 38987, name: "creating a world that is full of miracles"},
        {id: 4254, name: "in a universe we all share.’"},
        {id: 58797, name: "excerpt from We Are One book"}
    ];

    const weAreLoveData = [
        
        {id: 123, name: "‘Love is the power of the universe."},
        {id: 223, name: "It shines through every star."},
        {id: 323, name: "Love lights up everything you see."},
        {id: 423, name: "in a universe we all share.’"},
        {id: 523, name: "Love is who you are.’"},
        {id: 623, name: "excerpt from We Are Love book’"}      

    ]

    const downloadAppVideoData = [
                
        {id: 68768768, name: "‘We Are One APP’"},
        {id: 68745768, name: "Conscious Online Content"},
        {id: 68745889, name: "for Children!"}

    ]

    const followData = [
        {
            id:1789645,
            socialLink: "https://www.instagram.com/worldofweareone_/",
            imageLink: "/assets/images/instagram.png"
        }, 
        {
            id:254645,
            socialLink: "https://www.facebook.com/pages/We-Are-One/160342653631",
            imageLink: "/assets/images/facebook.png"
        },
        {
            id:3456456,
            socialLink: "https://pin.it/3i4QhaN",
            imageLink: "/assets/images/pinterest.png"
        },
        {
            id:445645654,
            socialLink: "https://www.youtube.com/channel/UCmQiaZw6_1zAmVgB9bIYoSw",
            imageLink: "/assets/images/channel-icon.png"
        }
    ]
    
    return (
        <div>            
            <NewBanner imgURL="/assets/images/JEN Rainbow Banner Light.png" bannerText="Timeless messages to inspire young ones." />
            <RainbowText imgUrl="/assets/images/Rainbow strip.png" />
            <Books imgUrl="/assets/images/Web book Banner.png" heading="BOOKS" btnUrl="/books" btnText="Browse Now" />
            <ArtPrints imgUrl="/assets/images/Art Print Web Page Banner.png" heading="art prints" btnUrl="/artprints" btnText="Browse Now" />
            <ChildBooks
            topHead="Favorites for every childs bookshelf!"
            btmHead="BUY YOURS HERE"
            />
            <VideoSec videoUrl="/assets/videos/video.mp4" />
            <AppImage imgLink="/application" imgUrl="/assets/images/App Banner Webiste.png" />
            <FreeColor 
            imgURL="/assets/images/coloring-spread-bg-2.png" 
            btnImgURL="/assets/images/Colouring Icon copy.png"
            btnURL="printables"
            />
            <Follow 
            title="Join us at"
            imgURL="/assets/images/join-us-bg.png"
            socialData={followData}
            />
            {/* <Banner imgURL="/assets/images/Jen-Web-banne-2r-min.jpg"/> 
            <WeAreOne loopData={weAreOneData} />
            <WeAreLove loopData={weAreLoveData} />
            <DownloadAppVideo loopData={downloadAppVideoData} />        
            <Video 
            btnURL=""
            btnImgURL="/assets/images/youtube-banner.png"
            /> */}
        </div>
    )
}


Index.getLayout = function getLayout(page: any) {
    return (
        <LayoutNew>
            {page}
        </LayoutNew>
    )
  }


  