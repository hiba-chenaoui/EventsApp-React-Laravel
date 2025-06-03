import React from 'react';

export default function SpaceInfoCard({data, updateData, next, prev}) {


    return(
        <div>
            <h3>Space Infos</h3>
            <p>Tell us more about the space you are offering</p>
            <input type="text" value={data.name} placeholder="Space Name ..."
                onChange={(e)=>{updateData({name: e.target.value})}}/>
            <input type="text" value={data.description} placeholder="Description ..."
                onChange={(e)=>{updateData({description: e.target.value})}}/>
            <div>
                 <img className="prev-next" src="/next.png" onClick={next}/>
            </div>
            <div>
                <img className="prev-next" src="/previous.png" onClick={prev}/>
            </div>
        </div>
    )
}