import React from 'react'
import Banner from 'components/common/Banner'
import AllBooks from 'components/books/AllBooks'

export default function Index() { 
    return (
        <>
            <Banner imgURL="/assets/images/Shop banner.png" />        
            <AllBooks
            topImg="/assets/images/NewRainbow strip.png"
            topHead="Loreum Ipsum"
            descp="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            btmHead="BUY YOURS HERE"
            />
        </>
    )
}
