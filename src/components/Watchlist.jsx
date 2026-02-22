import { useState,useContext, useEffect } from "react";
import {Tooltip} from "@mui/material"
import allStore from "./hooks/hooks";
import GeneralContext from "./GeneralContext";
import {BarChartOutlined, KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from "@mui/icons-material";

import { DoughnOutChart } from "./DoughnOutChart";


function Watchlist(){
    
    let {watchList,fetchWatchList}=allStore();
   
    let labels=[];
    
    useEffect( ()=>{
        
        
       const loadWatchList = async () => {
        try{
            await fetchWatchList();
        }catch(err){
            console.log(err);
        }
    };

    loadWatchList();
    },[])
    console.log(" fetching watchlist data ");
    (watchList.length>0 &&  (labels=watchList.map((subArray)=>subArray["symbol"])));
    
    let data={
        labels,
        datasets:[
            {
                
      label: 'price',
      data: watchList.map((stock)=>stock.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
            
        ]
    }
    return (
        <div className="watchlist-container">
            <div className="search-container"><input className="wlsearch me-1" type="text" placeholder="Search eg:infy, bse, nifty fut weekly,gold mcx" />
            <span style={{fontWeight:"300"}}>{watchList.length}/50</span>
           
            </div>
            {watchList.length>0 ? 
            <ul className="list">
                
                {
                    watchList.map((el,idx)=>{
                       
                        
                        return <WatchListItem stock={el} key={el.symbol}/>
                    })
                }
               
            </ul>:
            <h3>Loading ...</h3>
            }
            
            <DoughnOutChart data={data}/>
        </div>
    )
}
export default Watchlist;

const WatchListItem=({stock})=>{
    let [showAction,setShowAction]=useState(false);
   
    return <li  onMouseEnter={()=>setShowAction(true)} onMouseLeave={()=>setShowAction(false)} className="wlitem">
        <div className="item mt-2" >
            <p className={stock.isDown?"down":"up"}>{stock.symbol}</p>
        <div className="itemInfo">
            <span className="percent">{stock.percentChange.toFixed(2)}%</span>
            {stock.isDown?<KeyboardArrowDown className="down"/>:<KeyboardArrowUp className="up"/>}
            <span className="price">{stock.price}</span>
        </div>
        
        </div>
       <span> {showAction &&  <WatchListActions uid={stock.symbol}/> }</span>
       
       
    </li>
}


const WatchListActions=({uid})=>{
      const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    // console.log("the symbol is ",uid);1
    
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick=()=>{
    // console.log("sell click is called");working
    
    generalContext.openSellWindow(uid);
  }
    
    return (
        <span className="actions">
            
  <span>
    <Tooltip title="Buy (B)" arrow onClick={handleBuyClick}>
 
      <button className="buy">Buy</button>
    
  </Tooltip>
  <Tooltip title="Sell (S)" arrow onClick={handleSellClick}>
 
      <button className="sell ">Sell</button>
    
  </Tooltip>
  <Tooltip title="Analytics (A)" arrow>
 
      <button className="action"><BarChartOutlined className="icon"/></button>
    
  </Tooltip>
  <Tooltip title="More" arrow>
 
      <button className=" action"><MoreHoriz className="icon "/></button>
    
  </Tooltip>
  </span>
</span>

    )
}

