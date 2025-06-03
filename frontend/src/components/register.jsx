import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import '../styles/form.css'

export default function Register() {
  const {setToken} = useContext(AppContext) 
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Attendee",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    try {
    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/profile");
    }
  }catch (error) {
    console.error("Error during registration:", error); 
  }
}

  return (
    <div className="register form">
      <h1 className="title">Register </h1>

      <form onSubmit={handleRegister} >
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <p>– Which role fits you best?</p>
        <div className="role-btns">
          
          {["Attendee", "Organizer", "Service-provider"].map((roleOption)=>(
            <div className={`role-btn ${formData.role=== roleOption ? "active" : ""}`}
            key={roleOption}
             onClick={() =>
              setFormData({
                ...formData,
                role: roleOption,
              })
            }>
              {roleOption.replace("-"," ")}
            </div>
          ))}
        </div>
        <button type="submit" className="form-btn">Register</button>
        
      </form>
    </div>
  );
}