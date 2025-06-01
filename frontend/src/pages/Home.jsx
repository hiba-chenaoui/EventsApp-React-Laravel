import {useState} from 'react'

import Register from "../components/register";
import Login from "../components/login";
import Button from "../components/button";
import NavBar from "../components/navbar";


export default function Home(){
    const [form, setForm] = useState(null); // 'Register' or 'Login' or null

  
    return(
        <>
        <NavBar setForm={setForm} />

         {form ==="Register" && <Register/> }
         {form==="Login" && <Login/>}
        </>
    );
}