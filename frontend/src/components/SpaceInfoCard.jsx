import React from 'react';

export default function SpaceInfoCard({data, updateData, next, prev}) {


    return(
        <>
            <h3>Space Infos</h3>
            <p>Tell us more about the space you are offering</p>
            <input type="text" value={data.name} placeholder="Space Name ..."
                onChange={(e)=>{updateData({name: e.target.value})}}/>
            <input type="text" value={data.description} placeholder="Description ..."
                onChange={(e)=>{updateData({description: e.target.value})}}/>
            <div className="prev-next">
                <img className="prev" src="/previous.png" onClick={prev}/>
                <img className="next" src="/next.png" onClick={next}/>
           </div>
        </>
    )
}