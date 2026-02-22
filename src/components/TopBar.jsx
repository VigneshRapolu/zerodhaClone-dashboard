import Menu from "./Menu";

function TopBar(){
    
    
    return (
        <div className="topbar-container">
           <div className="indices-container">
            <div className="nifty mt-2">
                <span className="index">NIFTY 50</span>&nbsp;&nbsp;
                <span className="index-points">{100.2}</span>
                <p className="percent"> </p>
               
            </div>
            <div className="sensex mt-2">
                <span className="index">SENSEX</span>&nbsp;&nbsp;
                <span className="index-points">{100.2}</span>
                <p className="percent"> </p>
            </div>
            
           </div>
            <Menu/>
        </div>
    )
}
export default TopBar;