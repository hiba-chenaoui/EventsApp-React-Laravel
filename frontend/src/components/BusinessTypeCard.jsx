import React from 'react'



export default function BusinessTypeCard({data, updateData, next}){

    return(

        <>
        <p>What best describes your business?</p>
        <div className="form-cards">
            
            {["Space Provider", "Equipment provider", "Services"].map((Business)=>(
                <div className={`type-card ${data.business_type=== Business? "active" : ""}`}
                key={Business}
                onClick={() =>
                updateData({business_type: Business})
                }>
                <img src={
                    Business === "Space Provider" ? "/building.png" : 
                    Business === "Equipment provider" ? "/tools.png" : 
                    "/shipping.png"
                }/>
                {Business}
                </div>
            ))}
        </div>
        <div>
            <img className="prev-next" src="/next.png" onClick={next}/>
        </div>
        </>


    );
}