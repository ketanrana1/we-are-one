import React, { useState, useEffect} from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import { useRouter } from 'next/router';
import axios from 'axios';


const initialResponseState: any = [];

export default function AllCards(props) {
    const router = useRouter();
    const { AllCards } = props

    const [responseState, setResponseState] = useState(initialResponseState);

    async function handleDeleteClick(id: any) {

        try { 
        const response = await axios.post(`http://localhost:4000/api/card/delete/${id}`);
        setResponseState(response);
        return router.push(router.asPath)
        } catch (error) {
            console.log(error);
        }

    }


    return (      
        <div className="all-books-cont">
            <h3 className="mb-3">All Cards</h3>
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6>  
            </div>
            <div className="row py-3">
                {AllCards.map( (data:any, index) => {                       
                    return (
                        <div className="col-12 each-book" key={index}>
                            <h6>{data.card_content}</h6>
                            <div className="d-flex">
                                <p className="link-items">
                                    {/* <span><a href="">Edit</a></span> */}
                                    {/* <span><a onClick={() => handleViewClick(data.bookId)}>View</a></span> */}
                                    <span className="link-item-red"><a onClick={() => handleDeleteClick(data.id)}>Delete</a></span>
                                </p>
                            </div>
                        </div>
                    );
                })} 
            </div> 
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6> 
            </div>           
        </div>
    )
}   


export async function getServerSideProps(context) {
    let res: any;

    try { 
     res = await axios.get(`http://localhost:4000/api/card/allCards`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          AllCards : res.data.Cards
      }, 
    }
  }
  

AllCards.getLayout = function getLayout(page: any) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }


// const initialResponseState: any = [];
 
// export default function AllCards() {  

//     const [resposneState, setResponseState] = useState(initialResponseState);

//     async function makeRequest() { 
//         try { 
//             const config = {
//             method: 'get',
//             url: 'http://localhost:4000/api/card/allCards'
//         }
//         let res = await axios(config);       
//         setResponseState(res.data.Cards); 
//         } catch (error) {
//             console.log(error);
//         }          
//     }

//     useEffect(() => { makeRequest(); }, [])


//     async function handleDeleteClick(id: any) {

//         try { 
//             const config = {
//             method: 'post',
//             url: `http://localhost:4000/api/card/delete/${id}`
//         }
//         let res = await axios(config); 
//         } catch (error) {
//             console.log(error);
//         }

//     }

//     useEffect(() => { makeRequest(); }, [handleDeleteClick])


//     return (
//         <div>

//         <div className="all-books-cont">
//             <div className="row">
//                 <h2 className="pb-3"> All Cards</h2>
//             {resposneState.map( (data:any) => {                       
//                     return (
//                         <div className="col-12 each-book">
//                             <h6>{data.card_content}</h6>
//                             <div className="d-flex">
//                                 <p className="link-items">
//                                     <span className="link-item-red"><a onClick={() => handleDeleteClick(data.cardId)}>Delete</a></span>
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>            
//         </div>
            
//         </div>
//     )
// }


// AllCards.getLayout = function getLayout(page) {
//     return (
//       <AdminLayout>
//             {page}
//       </AdminLayout>
//     )
//   }
