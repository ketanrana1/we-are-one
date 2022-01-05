import React, { useState, useEffect} from 'react'
import LayoutNew from 'components/common/LayoutNew'

export default function Newcart() {



    let [cart, setCart] = useState([])
  
    let localCart:any = localStorage.getItem("cart");
    
    const addItem = (item)  =>   {}
    const updateItem = (itemID, amount) => {}
    const removeItem = (itemID) => {}
    

    useEffect(() => {

      localCart = JSON.parse(localCart);

      if (localCart) setCart(localCart)
      
    }, []) 
  
  
    
    return <div></div>



}


Newcart.getLayout = function getLayout(page) {
    return (
        <LayoutNew>
            {page}
        </LayoutNew>
    )
  } 
