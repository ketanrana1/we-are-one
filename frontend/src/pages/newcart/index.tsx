import React, { useState, useEffect} from 'react'
import LayoutNew from 'components/common/LayoutNew'

export default function Newcart() {



    let [cart, setCart] = useState([])
  
    let localCart:any = localStorage.getItem("cart");
    
    const addItem = (item)  =>   {}
    const updateItem = (itemID, amount) => {}
    const removeItem = (itemID) => {}
    
    //this is called on component mount
    useEffect(() => {
      //turn it into js
      localCart = JSON.parse(localCart);
      //load persisted cart into state if it exists
      if (localCart) setCart(localCart)
      
    }, []) //the empty array ensures useEffect only runs once
  
  
    
    return <div></div>



}


Newcart.getLayout = function getLayout(page) {
    return (
        <LayoutNew>
            {page}
        </LayoutNew>
    )
  } 
