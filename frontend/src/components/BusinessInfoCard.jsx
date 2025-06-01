import React from 'react'

export default function BusinessInfoCard({data, updateData,next ,prev}){
    
    return(
    <div>
        <h3>Business Informations</h3>
        <p>We need to know more about your business</p>
        <input type="text" value={data.company_name} placeholder="Business Name ..."
        onChange={(e)=>updateData({company_name: e.target.value})}
        />
        <input type="text" value={data.description} placeholder="Description ..."
        onChange={(e)=>updateData({description: e.target.value})}
        />
        <input type="tel" value={data.phone} onChange={(e)=>updateData({phone: e.target.value})}/>
        <div>
            <img className="prev-next" src="/next.png" onClick={next}/>
        </div>
        <div>
            <img className="prev-next" src="/previous.png" onClick={prev}/>
        </div>

    </div>
    )
}