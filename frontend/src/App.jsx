import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/test")
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error("Erreur:", error));
    }, []);

    return (
        <div>
            <h1>Test CORS</h1>
            <p>Message du backend: {message}</p>
        </div>
    );
}

export default App;
