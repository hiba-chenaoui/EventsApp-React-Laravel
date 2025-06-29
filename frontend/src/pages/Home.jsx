import {useState} from 'react'

import Register from "../components/register";
import Login from "../components/login";
import Button from "../components/button";
import NavBar from "../components/navBar";
import Sidebar from '../components/sidebar';


export default function Home(){
    const [form, setForm] = useState(null); 

  
    return(
        <>
        <NavBar setForm={setForm} />

         {form ==="Register" && <Register/> }
         {form==="Login" && <Login/>}
        </>
    );
}