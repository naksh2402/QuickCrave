import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatchCart,useStateCart} from '../components/ContextReducer.jsx'

export default function Cart(){
  let data=useStateCart();
  let dispatch=useDispatchCart();
  if(data.length===0){
    return(
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">The Cart is Empty!!</div>
      </div>
    )
  }

  const handleCheckOut=async()=>{
  let userEmail=localStorage.getItem("userEmail");
  let response= await fetch("http://localhost:5000/api/orderData",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      order_data:data,
      email:userEmail,
      order_date:new Date().toDateString()
    })
  })
  console.log("Order Response:",response);
  if(response.status===200){
    dispatch({type:"DROP"})
  }
  }

// total will be returned as return value of reduce function(data contains "ADD data of cart") 
 let totalPrice=data.reduce((total,current)=>total+current.price,0)

 return(
  <div>
   {/* {console.log(data)} */}
<div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
<table className="table table-hover table-dark">
<thead className="text-success fs-4">
  <tr>
   <th scope="col">#</th> 
   <th scope="col">Name</th> 
   <th scope="col">Quantity</th> 
   <th scope="col">Option</th> 
   <th scope="col">Amount</th> 
   <th scope="col"></th> 
  </tr>
</thead> 

<tbody className="text-white">
  {data.map((food,index)=>{
    return(
    <tr key={index+1}>
      <th scope="row">{index+1}</th>
      <td>{food.name}</td>
      <td>{food.qty}</td>
      <td>{food.size}</td>
      <td>{food.price}</td>
      <td><button className="btn p-0"><DeleteIcon color="primary" onClick={()=>{dispatch({type:"REMOVE",index:index})}} />
     </button></td>
    </tr>
    );
  })}
</tbody>
</table>
<div>
  <h1 className="fs-2 text-white">Total Price :{totalPrice}/-</h1>
</div>
<button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
</div>

  </div>
 )

};







// import Delete from '@material-ui/icons/Delete'

//   const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");
//     // console.log(data,localStorage.getItem("userEmail"),new Date())
//     let response = await fetch("http://localhost:5000/api/auth/orderData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         order_data: data,
//         email: userEmail,
//         order_date: new Date().toDateString()
//       })
//     });
//     console.log("JSON RESPONSE:::::", response.status)
//     if (response.status === 200) {
//       dispatch({ type: "DROP" })
//     }
//   }

