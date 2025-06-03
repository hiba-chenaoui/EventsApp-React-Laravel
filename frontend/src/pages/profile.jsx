import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Button from "../components/button";
import NavBar from "../components/navBar";
import RegistrationWizard from "../components/RegistrationWizard";


export default function Profile(){
    const {user, token} = useContext(AppContext);
    const navigate = useNavigate(); 

    if (!user) {
    return <p>Loading user info...</p>;
    }
    console.log("User role:", user.role);
    return(
        <>
        <NavBar/>
        <RegistrationWizard/>
        </>
    )
}