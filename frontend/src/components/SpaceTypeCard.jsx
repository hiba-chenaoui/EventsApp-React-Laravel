import '../styles/SpaceTypeCard.css';
export default function SpaceTypeCard({data, updateData , next, prev}){
   const spaceTypes = [
        "Art Studio",
        "Yoga Studio",
        "Pottery Studio",
        "Workshop Room",
        "Meditation Room",
        "Dance Studio",
        "Garden Space",
        "Wellness Room",
        "Rooftop Space",
        "Community Hall",
        "Pop-up Space",
        "Retreat Cabin"
];

    return(
        <>
            <h3>Space Type</h3>
            <p>What type of space are you offering?</p>
            <div className="form-cards">
                {spaceTypes.map((type)=>{
                    return(
                        <div
                        className={`type-card ${data.type_of_space === type ? "active" : ""}`}
                        key={type}
                        onClick={()=>updateData({type_of_space: type})}
                        >
                            <img src={
                                type === "Art Studio"         ? "/artstudio.png" :
                                type === "Yoga Studio"        ? "/yoga.png" :
                                type === "Pottery Studio"     ? "/pottery.png" :
                                type === "Workshop Room"      ? "/meeting-room.png" :
                                type === "Meditation Room"    ? "/meditation.png" :
                                type === "Dance Studio"       ? "/dance.png" :
                                type === "Garden Space"       ? "/garden.png" :
                                type === "Retreat Cabin"      ? "/cabin.png" :
                                "not-found.png"

                            } alt={type}/>
                            {type}
                        </div>
                    )
                })}
            </div>
           <div className="prev-next">
                <img className="prev" src="/previous.png" onClick={prev}/>
                <img className="next" src="/next.png" onClick={next}/>
            </div>
        </>
    )
}