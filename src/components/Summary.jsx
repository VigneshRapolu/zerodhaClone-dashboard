import { useEffect, useState } from "react";

import allStore from "./hooks/hooks";
function Summary(){
const {fetchHoldings,holdings}=allStore();
const [currVal,setCurrVal]=useState(0);
const [PL,setPL]=useState(0);
const [investment,setInvestment]=useState({
    investment:0,
    PL:0,
    pnlPercent:0,
    currVal:0
});
    useEffect(()=>{
        if(holdings.length==0){
            fetchHoldings();
        }
        
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
        
        
        
    },[])


    return (
    <div className="summary-container" >
        <div className="row fs-5 border-bottom mt-5 ms-2">
            <div className="col"><p>Hi, User!</p></div>
        </div>
        <div className="row"><p className="fs-5 p-5 pb-4 ps-4 ms-2">Equity</p></div>
        <div className="row border-bottom mb-3 pb-3">
            <div className="col-4">
                
                <p className="fs-1 ps-3 mb-0">3.74k</p>
                <p className="p-3 mt-0 ms-2 text-muted" style={{fontSize:"10px"}}>Margin Available</p>
            </div>
            <div className="col-1">
                <hr className="vr pb-5" />
            </div>
            <div className="col text-muted p-2 ps-5">
                <p style={{fontSize:"15px"}}>Margin used 0</p>
                <p style={{fontSize:"15px"}}>Opening balance 3.74k</p>
            </div>
        </div>
        <div className="row p-3">
            <p>Holdings({holdings.length})</p>
        </div>
        <div className="row">
            <div className="col-4">
                
                <span className="fs-1 ps-3 mb-0">{new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(investment.PL)}
</span> <span className="">{`${investment.pnlPercent >= 0 ? "+" : ""}${(investment.pnlPercent ?? 0).toFixed(1)}%`}</span>
                <p className="p-3 mt-0 ms-2 text-muted" style={{fontSize:"10px"}}>P&L</p>
            </div>
            <div className="col-1">
                <hr className="vr pb-5" />
            </div>
            <div className="col text-muted p-2 ps-5">
                <p style={{fontSize:"15px"}}>Current value {new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(investment.currVal) || 0}</p>
                <p style={{fontSize:"15px"}}>Investment {new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(investment.investment)}</p>
            </div>
        </div>
        
    </div>
    )
}

export default Summary