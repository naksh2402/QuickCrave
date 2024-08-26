import React,{useState,useRef,useEffect} from "react";
import { useDispatchCart,useStateCart } from "./ContextReducer";


function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  
   let dispatch=useDispatchCart();
   let data=useStateCart();
   const priceRef=useRef();

  const handleCart = async() => {
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        // already present in cart
        food=item;
        break;
      }
    }
    if(food!==[]){
      if(food.size===size){
        // of same portion but with diffrent qty

      await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
      return
    }
    else if(food.size!==size){
       await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img}); 
       return;
    }
    return;
  }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img}) 
  // state
  //  console.log(data);
  };

  let finalPrice=qty* parseInt(options[size]);
  useEffect(()=>{
  setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div className="card mt-3" style={{ width: "17rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{ height: "190px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing</p> */}
          <select className="m-2 p-1 rounded bg-success h-100" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select className="m-2 h-100 bg-success rounded p-1" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>          
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <div className="d-inline h-100 fs-5">Rs{finalPrice}/</div>
          <hr />  
          <button className="btn btn-success justify-center ms-2 " onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
