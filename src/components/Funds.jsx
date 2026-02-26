function Funds(){
    return (
    <div className="container-fluid">
        <div className="row d-flex justify-content-end p-5 mb-4">
            <p className="text-muted mt-1" style={{fontWeight:'200',width:'auto'}} >Instant, zero-cost fund transfer with UPI</p>
            <button className="btn col-2 btn-primary m-2">Add funds</button><button className="btn col-2 btn-primary m-2">Withdraw</button>
        </div>
        <div className="row">
            <h4 className="text-muted">Equity</h4>
            <table className="border col-4 p-5 text-center" >
                <tbody>
                     <tr>
                <th>Available margin</th>
                <td>4,043.10</td>
               </tr>
               <tr><th>used margin</th>
               <td>3,757.30</td>
               </tr>
               <tr>
                <th>Available cash</th>
                <td>4,040.10</td>
               </tr>
                
                </tbody>
              
              
            </table>
        </div>
    </div>
    )
}
export default Funds