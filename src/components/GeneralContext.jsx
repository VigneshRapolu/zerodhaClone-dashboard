import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellWindow from "./SellWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow:(uid)=>{},
  closeSellWindow:()=>{},

});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  // const [selectedStockUID, setSelectedStockUID] = useState("");
const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const handleOpenBuyWindow = (uid) => {
    // console.log(uid," is the symbol");
    
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };
  
  const handleOpenSellWindow = (uid) => {
    // console.log(uid," is the symbol");
    
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    // console.log("sell window s about to close");
    
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow:handleOpenSellWindow,
        closeSellWindow:handleCloseSellWindow
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellWindow uid={selectedStockUID}/>}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;