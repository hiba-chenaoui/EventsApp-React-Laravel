import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";




export default function Layout(){
    const {user,setUser , token, setToken} = useContext(AppContext)

    async function handleLogout(e) {
      e.preventDefault();
  
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      Navigate("/");
    }
   }
    return(
        <>
         <header>
            <nav>
             <Link to="/">Home</Link>
              {user ? (
                  <div >
                  <p >Welcome back {user.name}</p>
                  <form onSubmit={handleLogout}>
                    <button type="submit">Logout</button>
                  </form>
                </div>
              ) : (
                <div>
                     <Link to="/register">Register</Link>
                     <Link to="/login">Login</Link>
                </div>
            )} 
            </nav>
         </header>
         <main>
            <Outlet/>     
         </main>
        </>
    );

}