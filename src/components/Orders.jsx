import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import allStore from "./hooks/hooks";
const Orders = () => {
  const {orders,fetchOrders}=allStore();
  useEffect(()=>{
   
    fetchOrders();
    
    
  },[])
  return (
    <div className="orders">
      <h1>Your Orders ({orders.length})</h1>
      {(orders.length==0)?<div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>:<ShowOrders allOrders={orders}/>}
      
      
    </div>
  );
};
function ShowOrders({allOrders}){
  return (
    <div className="row p-5 ps-3 pe-0">
            {/* <h3 className="pb-3">Orders ({orders.length})</h3> */}
            <div className="row ">
            <table className="table table-bordered ">


              <thead>
                 <tr>
                    <th><p>Name</p></th>
                    <th><p>Qty</p></th>
                  
                    
                    <th><p>Price</p></th>
                    <th><p>Mode</p></th>
                     <th><p>Date</p></th>
                </tr>
              </thead>
                <tbody>
                    {allOrders.map((stock,index)=>{
                        const date=new Date(stock.date).toLocaleDateString()

                        return (
                           <tr key={index}>
                            <td>{stock.symbol}</td>
                            <td>{stock.qty}</td>
                            <td>{stock.price}</td>
                            <td>{stock.mode}</td>
                           <td>{date}</td>
                           </tr>
                        )

                    })}
                    
                </tbody>
            </table>

            </div>
        </div>

   
  )
}

export default Orders;