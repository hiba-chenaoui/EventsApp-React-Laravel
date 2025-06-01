import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Button from "../components/button";
import "../styles/navbar.css"

export default function NavBar({setForm}){
    const {user, token} = useContext(AppContext);
    const navigate = useNavigate(); 
   

    const handleClick = (type) => {
     setForm(type);
    };

    async function handleLogout(){
        const res = await fetch('api/logout',{
            method : "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data= await res.json();
        console.log(data);
        navigate("/");

    }


    return(
     <header className="header">
      <h1 className="logo">SoulHub</h1>

      <div className="dual-button">
        { user ? (
          <Button type="Logout" onClick={handleLogout}/>
        ) : (
          <>
            <Button type="Register" onClick={()=>handleClick("Register")}/>
            <Button type="Login" onClick={()=>handleClick("Login")}/>
          </>
        )}
      </div>
    </header>

    )
}