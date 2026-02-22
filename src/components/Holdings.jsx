import axios from "axios";
import VerticalGraph from "./VerticalGraph"
import { useState } from "react";
import { useEffect } from "react";
import allStore from "./hooks/hooks";

function Holdings(){    
    // let [holding,setHolding]=useState([]);  
   
     const {holdings,fetchHoldings}=allStore();
     const [investment,setInvestment]=useState({
    investment:0,
    PL:0,
    pnlPercent:0,
    currVal:0
});
    //    fetchHoldings();
    useEffect(()=>{
       
        
        try{
            // console.log("fetching holdings first time");
            
                fetchHoldings();
                  
        setInvestment(()=>{
            let totalInvestment=0;
            let totalcurrVal=0;
           holdings.forEach(stock=>{
            totalInvestment+=stock.avgPrice*stock.qty;
            totalcurrVal += stock.qty * stock.price;
           })
           const totalPnL=totalcurrVal-totalInvestment;
           const pnlPercent=(totalPnL/totalInvestment)*100;
           return {
            investment:totalInvestment,
            PL:totalPnL,
            currVal:totalcurrVal,
            pnlPercent:pnlPercent
           }

        })
            
        
        // console.log("holdings from jsx",holdings);
        
        }catch(err){
            console.log(err);

            
        }
        
    },[]);
    
        const labels=holdings.map((subArray)=>subArray['symbol']);
    const data={
        labels,
        datasets:[
            {
                label:"Stock Price",
                data:holdings.map((stock)=>stock.price),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
        ],
    };
    
    
   
    return (
       <>
    {(holdings.length>0)?<div className="container-fluid">
        <div className="row p-5 ps-3 pe-0">
            <h3 className="pb-3">Holdings ({holdings.length})</h3>
            <div className="row ">
            <table className="table table-bordered ">


              <thead>
                 <tr>
                    <th><p>Instruments</p></th>
                    <th><p>Qty</p></th>
                    <th><p>Avg.cost</p></th>
                    <th><p>LTP</p></th>
                    <th><p>Cur.val</p></th>
                    <th><p>P&L</p></th>
                    <th><p>% chg</p></th>
                    <th><p>Day chg</p></th>
                </tr>
              </thead>
                <tbody>
                    {holdings.map((stock,index)=>{
                        const currVal=stock.price*stock.qty || 0;
                        const PL=(stock.price-stock.avgPrice)*stock.qty;
                        const isProfit=PL>=0;
                        const profitClass=isProfit?"profit":"loss";
                        const dayClass=stock.percentChange>=0?"profit":"loss";
                        
                            return (
                           <tr key={index}>
                            <td>{stock.symbol}</td>
                            <td>{stock.qty}</td>
                            <td>{stock.avgPrice.toFixed(2)}</td>
                            <td>{stock.price.toFixed(2)}</td>
                            <td>{currVal}</td>
                            <td className={profitClass}>{PL.toFixed(2) || 0}</td>
                            <td className={dayClass}>{stock.percentChange}</td>
                            <td className={dayClass}>{stock.netChange} </td>
                           </tr>
                        )

                    })}
                    
                </tbody>
            </table>

            </div>
        </div>
        <div className="row">
            <div className="col"><h3 className="mb-0 pb-0" style={{fontWeight:"400"}}>{investment.investment}.</h3><p>55</p>
            <p className="text-muted">Total investment</p>
            </div>
            <div className="col">
                <h3 className="mb-0 pb-0" style={{fontWeight:"400"}}>{investment.currVal}</h3><p>95</p>
            <p className="text-muted">Current value</p>
            </div>
            <div className="col">
                <h3 className="mb-5"  style={{fontWeight:"400",color:"green"}}>{investment.PL.toFixed(2)} ({`${investment.pnlPercent >= 0 ? "+" : ""}${(investment.pnlPercent ?? 0).toFixed(1)}%`})</h3><p> </p>
            <p className="text-muted">P&L</p>
            </div>
        </div>
    </div>:<h3>No Holdings, Order Something to view</h3>  }   
    {holdings.length>0 && <VerticalGraph data={data}/>} 
    </>
)
}

export default Holdings