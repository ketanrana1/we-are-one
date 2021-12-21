import React from 'react'
import LayoutNew from 'components/common/LayoutNew'
import ProductNew from 'components/product/ProductNew'
import ProductNewImage from 'components/product/common/ProductNewImage'

const allImages = [
    {
        "id": 9651,
        "url": "/assets/images/artPrints/abundant-eart-bundle/Abundant Earth Bundle 1.jpg"
    },
    {
        "id": 9652,
        "url": "/assets/images/artPrints/abundant-eart-bundle/Abundant Earth Bundle 2.jpg"
    },
    {
        "id": 9653,
        "url": "/assets/images/artPrints/abundant-eart-bundle/Abundant Earth Bundle 3.jpg"
    },
    {
        "id": 9654,
        "url": "/assets/images/artPrints/abundant-eart-bundle/Abundant Earth Bundle 4.jpg"
    }
]

const content = "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><h5>Loreum Ipsum</h5><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>";


export default function AbundantEartBundle() {
    return (
        <div className="product-detail-cont container">
            <div className="row gx-5">
                <div className="col-12 col-md-7">
                    <ProductNewImage 
                        allImagesData={allImages} 
                    />
                </div>
                <div className="col-12 col-md-5">
                    <ProductNew 
                        name="Abundant Eart Bundle"
                        by="by Jennifer Black"
                        price="99.50"
                        content={<div dangerouslySetInnerHTML={{__html: content}}></div>}
                    />
                </div>
            </div>    
        </div>
    ) 
}


AbundantEartBundle.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 