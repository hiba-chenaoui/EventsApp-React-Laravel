import React from 'react'


export default function BusinessTypeCard({data, updateData, next, prev, username}){

    return(

        <>
       <h1>Awesome, {username} !</h1>
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
        <div className="prev-next">
            <img className="prev" src="/previous.png" onClick={prev} disabled={true}/>
            <img className="next" src="/next.png" onClick={next}  disabled={!data?.business_type}/>
        </div>
        </>


    );
}