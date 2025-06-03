import React from "react";
import "./Card.css";

function Card (){
    // if we want ot use a real img we will neeed to 
    // place it in the assests folder and then import it 
return(
    <div className="card">
    <img className="card-image" src="https://placehold.co/150" alt="card 1 image" />
    <h2 className="card-title">Card 1 title</h2>
    <p className="card-text">here we can include the descirption of te card Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat minima omnis debitis natus recusandae dolores doloremque consequuntur ad, ullam iusto earum temporibus ipsum quibusdam expedita praesentium ea sint culpa suscipit.</p>
    </div>
)
}

export default Card;