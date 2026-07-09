import { useState } from "react";
import axios from "axios";

function Register() {

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const registerUser = async () => {

    try {

        const response = await axios.post(
            "http://localhost:8081/auth/register",
            {
                fullName,
                email,
                password
            }
        );

        alert(response.data);

        setFullName("");
        setEmail("");
        setPassword("");

    } catch (error) {

        console.log(error);

        alert("Registration Failed");

    }

};

return (

    <div className="app">

        <div className="upload-card">

            <h1>Create Account</h1>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={registerUser}>
                Register
            </button>

        </div>

    </div>

);

}

export default Register;
