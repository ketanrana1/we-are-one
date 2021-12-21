import React from 'react'
import Banner from 'components/common/Banner'
import TextWithVideo from './TextWithVideo'

export default function Index() {
    return (
        <>
           <Banner imgURL="/assets/images/AppBanner Website Large.png" />
           <TextWithVideo 
           topImg="/assets/images/AppRainbow strip(1).png" 
           head="Loreum Ipsum"
           descp="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
           videoUrl="/assets/videos/app-add.mp4" 
           />
        </>
    )
}
