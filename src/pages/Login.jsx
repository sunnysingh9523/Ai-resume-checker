
import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8081/auth/login",
                {
                    email,
                    password
                }
            );

            alert(response.data);

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <div className="app">

            <div className="upload-card">

                <h1>Login</h1>

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

                <button onClick={loginUser}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;
