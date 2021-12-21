import React from 'react'
import ProductNewImage from './common/ProductNewImage'

export default function ProductNew(props: any) {
    return (
        <div className="product-info-cont">

            <h2 className="prouct-name">{props.name}</h2>
            <p className="product-by">{props.by}</p>
            <p className="price">${props.price}</p>
            <form>
                <div className="size-selector">
                    <p>Size:</p>
                    <select>
                        <option disabled>Select Size:</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                        <option value="Small">Small - 73cm X 36cm</option>
                    </select>
                </div>
                <div className="quantity-selector">
                <p>Qty:</p>
                    <input type="number" id="quantitySelector" className="slectr-qty" placeholder="1" />
                </div>
                <input type="submit" value="ADD TO CART" />
            </form>
            <div className="product-details-content-cont">
                <h4>Description:</h4>
                {props.content}
            </div>
            
        </div>
    )
}
