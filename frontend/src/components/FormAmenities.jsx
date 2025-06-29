import React, { useState } from 'react';
export default function Amenities({ data, updateData, prev, onSubmit }) {

    const [amenities, setAmenities] = useState(data.amenities || {
        wifi: false,
        parking: false,
        projector: false,
        whiteboard: false,
        airConditioning: false,
        heating: false,
        restrooms: false,
        security: false,
        soundSystem: false,
        lightingEquipment: false,
        soundproof: false,
        lockers: false,
    });

    const handleAddAmenity = (amenity)=>{
        setAmenities(prev => ({
            ...prev,
            [amenity]: !prev[amenity],
        }));
        updateData({
            amenities:{
                ...amenities,
                [amenity]: !amenities[amenity],
            }
        });
    }
    return (
        <div className="amenities-container">
            <h3>Amenities</h3>
            <p>What amenities does your space offer?</p>
            <div className="form-cards"> 
                {Object.keys(amenities).map((amenity)=>{
                    return(
                        <div
                        className={`type-card ${amenities[amenity] ? "active" : ""}`}
                        key={amenity}
                        onClick={()=>handleAddAmenity(amenity)}
                        > 
                        <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                        <div className="amenity-icon">
                        <img src={
                            amenity === "wifi" ? "/wifi.png" :
                            amenity === "parking" ? "/parking.png" :
                            amenity === "projector" ? "/projector.png" :
                            amenity === "whiteboard" ? "/whiteboard.png" :
                            amenity === "airConditioning" ? "/ac.png" :
                            amenity === "heating" ? "/heating.png" :
                            amenity === "restrooms" ? "/restrooms.png" :
                            amenity === "security" ? "/security.png" :
                            amenity === "soundSystem" ? "/speaker.png" :
                            amenity === "lightingEquipment" ? "/lighting.png":
                            amenity === "soundproof" ? "/soundproof.png" :
                            amenity === "lockers" ? "/locker.png" :
                            "not-found.png"} />
                        </div>
                        </div>
                    )
                })}   
            </div>
            <div className="prev-next">
                <img className="prev" src="/previous.png" onClick={prev} />
                <img className="next" src="/next.png" onClick={(e)=>onSubmit()} />
                
            </div>
        </div>

    )

}